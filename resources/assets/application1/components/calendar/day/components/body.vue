<template>
<div id="chart-container" />
</template>

<i18n>
{
  "en_US": {
"conflict":"conflict",
"jobs":"jobs",
"supervision":"supervision"
  },
  "zh-CN": {
"conflict":"冲突",
"jobs":"工作",
"supervision":"监督"
  }
}
</i18n>

<script>
import echarts from 'echarts'

//根据
function buildList(list) {
  let result = [];
  for (let m = 0; m < list.length; m++) {
    if (list[m] != null)
      result[result.length] = list[m];
  }
  return result;
}
//根据thing中的fid，组成嵌套关系
function buildTree(list) {
  // console.log(list);
  for (let m = 0; m < list.length; m++) {
    for (let n = 0; n < list.length; n++) {
      if (list[n] != null && list[m] != null) {
        let tmp = find_position(list[m], list[n]);
        if (tmp != false) {
          list[n] = tmp;
          list[m] = null;
          break;
        }
      }
    }
  }

  let result = [];
  for (let m = 0; m < list.length; m++) {
    if (list[m] != null) {
      result.push(list[m]);
    }
  }

  return result;
}
/*buildlist 递归部分*/
function find_position(thing, thingtree) {
  // console.log("thingtree");
  // console.log(thingtree);
  if (thingtree._id == thing.Attribute.fatherId) {
    // console.log("has father");
    if (thingtree.children != undefined) {
      // console.log("child exist");
      thingtree.children.push(thing);
      //console.log(thingtree.children);
    } else {
      // console.log("child no exist");
      thingtree.children = [thing];
    }
    return thingtree;
  }
  // console.log("no father in root");

  if (thingtree.children != undefined) {
    // console.log("child exist");
    for (let i = 0; i < thingtree.children.length; i++) {
      let tmp = find_position(thing, thingtree.children[i]);
      if (tmp != false) {
        thingtree.children[i] = tmp;
        // console.log("find father in child");
        return thingtree;
      }
    }
    // console.log("no father in child");
  }
  // console.log("child not exist");
  return false;
}

/*
给定一个thinglist，重新计算所有权重
 */
function calculate_weight_list(thingList) {
  for (let i = 0; i < thingList.length; i++) {
    calculate_weight(thingList[i]);
  }
  return thingList;
}
/*
计算一个thing的权重
 */
function calculate_weight(thing) { //计算事件的权重
  thing['calculateWeight'] = thing['Attribute']['importance'];

  if (thing['Attribute']['time']['data']['workTime'] == 0) {
    thing['calculateWeight'] = parseFloat(thing['calculateWeight']) + 0.5;
  } else {
    let startTime = new Date(thing['Attribute']['time']['data']['startTime']);
    let endTime = new Date(thing['Attribute']['time']['data']['endTime']);
    let a = (endTime - startTime) / 60000; //可工作事件-分钟
    if (thing['Attribute']['time']['data']['workTime'] * 3 > a) {
      thing['calculateWeight'] = parseFloat(thing['calculateWeight']) + 0.5;
    }
    if (thing['Attribute']['time']['data']['workTime'] * 5 > a) {
      thing['calculateWeight'] = parseFloat(thing['calculateWeight']) + 0.5;
    }
    if (thing['Attribute']['time']['data']['workTime'] * 10 > a) {
      thing['calculateWeight'] = parseFloat(thing['calculateWeight']) + 0.5;
    }
  }
  return thing;
}

/*排序*/
function serialization_priority(thingList) {
  //对高度
  thingList.sort(function(a, b) {
    return parseFloat(b['height']) - parseFloat(a['height']);
  });
  //对重要性排序
  thingList.sort(function(a, b) {
    return parseFloat(a['calculateWeight']) - parseFloat(b['calculateWeight']);
  });
  //对截止时间
  thingList.sort(function(a, b) {
    return new Date(a['Attribute']['time']['data']['endTime']) - new Date(b['Attribute']['time']['data']['endTime']);
  });
}

/*获取一个list中所有节点的深度*/
function treeHeightList(thingTreeList) {
  for (let i = 0; i < thingTreeList.length; i++) {
    treeHeight(thingTreeList[i]);
  }
  return thingTreeList;
}
/*
获取一个节点的深度
 */
function treeHeight(thingTreeNode) {
  let result = 0;
  //console.log(thingTreeNode.children);
  if (thingTreeNode.children != undefined) {
    //console.log(thingTreeNode.children.length);
    for (let i = 0; i < thingTreeNode.children.length; i++) {
      let tmp = treeHeight(thingTreeNode.children[i])
      if (tmp > result)
        result = tmp;
    }
  }
  result++;
  thingTreeNode['height'] = result;
  return result;
}
/*
匹配到日历

@pause 事件之间的休息事件 单位min

 */
function matching(thingList, startTime, endTime, pause = 5) {
  let result = [];
  let tmp = thingList.slice(0);
  //将固定事件加入结果，从待排序中剔除固定事件,
  for (let i = 0; i < tmp.length; i++) {
    if (tmp[i]['Attribute']['time']['data']['fixed']) {
      result.push({
        name: tmp[i]['Attribute']['title'],
        value: [
          //列数
          1,
          //起始时间
          +new Date(tmp[i]['Attribute']['time']['data']['startTime']),
          //结束时间
          +new Date(tmp[i]['Attribute']['time']['data']['endTime']),
          //工作时间
          tmp[i]['Attribute']['time']['data']['workTime'] * 60000,
          //数据节点
          tmp[i],
        ],
        itemStyle: {
          normal: {
            color: "#bd6d6c",
          }
        }
      });
      tmp.splice(i, 1);
      i--;
    }
  }

  let baseTime = new Date();
  let free = 0;
  let resultCounter = 0;
  let died = false; //用来标识是否能够将所有的任排进去

  while (tmp.length != 0) {
    //寻找空档
    while (resultCounter < result.length) {
        //若当前时间大于上一个事件的结束时间
      if ((baseTime - new Date(result[resultCounter]['value'][4]['Attribute']['time']['data']['endTime']) > 0)) {
        resultCounter++;
        continue;
      }

      if ((new Date(result[resultCounter]['value'][4]['Attribute']['time']['data']['startTime']) - baseTime) > 0) {
        free = new Date(result[resultCounter]['value'][4]['Attribute']['time']['data']['startTime']) - baseTime;
        console.log(new Date(result[resultCounter]['value'][4]['Attribute']['time']['data']['startTime']));
        console.log(baseTime);
        console.log("Afree:"+free/60000);
        break;
      } else {
        baseTime = new Date((+new Date(result[resultCounter]['value'][4]['Attribute']['time']['data']['endTime'])) + pause * 60000);
        resultCounter++;
      }

      if ((resultCounter >= result.length)) {
        free = new Date(endTime) - new Date(baseTime) //3天
        console.log("Bfree:"+free/60000);
        died = true;
      } else {
        free = new Date(result[resultCounter]['value'][4]['Attribute']['time']['data']['startTime']) - baseTime;
      }

      break;
    }

    //如果没有需要匹配的数据
    if ((resultCounter >= result.length)) {
      free = new Date(endTime) - new Date(baseTime) //3天
      died = true;
    }
    //寻找合适插入的任务
    for (let i = 0; i < tmp.length; i++) {
      //如果当前的事件需要的工作事件低于空闲时间
      if ((free - parseInt(tmp[i]['Attribute']['time']['data']['workTime']) * 60000) > 0) {
        console.log("cost:"+parseInt(tmp[i]['Attribute']['time']['data']['workTime']));
        // console.log((free-parseInt(tmp[i]['Attribute']['time']['data']['workTime']) * 60000 ));
        // console.log(tmp[i]['Attribute']['title']);
        //检查
        if (!isInclude(tmp[i].children, tmp)) {
          //  console.log(baseTime);
          result.push({
            name: tmp[i]['Attribute']['title'],
            value: [
              //列数
              1,
              //起始时间
              +baseTime,
              //结束时间
              parseInt(tmp[i]['Attribute']['time']['data']['workTime']) * 60000 + (+baseTime),
              //工作时间
              parseInt(tmp[i]['Attribute']['time']['data']['workTime']) * 60000,
              //数据节点
              tmp[i],
            ],
            itemStyle: {
              normal: {
                color: "#77bd6c",
              }
            }
          });
          baseTime = new Date((parseInt(tmp[i]['Attribute']['time']['data']['workTime']) + pause) * 60000 + (+baseTime));
          console.log('free:'+free/60000);
          console.log('baseTime:'+baseTime);
          free = free - (parseInt(tmp[i]['Attribute']['time']['data']['workTime']) + pause) * 60000;
          tmp.splice(i, 1); //删除元素
          i--; //校准index
          died = false;

        }
      }
    }
    //未能在截至事件前将所有任务排进去
    if (died == true) {
      alert("未能在截至事件前将所有任务排进去")
      return false;
    }
    resultCounter++;
  }
  return result;
}

function checkMin(i) {
  if (i < 10)
    return "0" + i;
  else return i;
}
/*检查两个数组是否存在交集*/
function isInclude(array1, array2) {
  if (array1 == undefined)
    return false;
  if (array2 == undefined)
    return false;
  for (let m = 0; m < array1.length; m++) {
    for (let n = 0; n < array2.length; n++) {
      if (array1[m] == array2[n]) {
        return true;
      }
    }
  }
  return false;
}

export default {
  name: 'daybody',
  data() {
    let data = [
      //   {
      //   name: "typeItem.name",
      //   value: [
      //     1,
      //     // 1529480424000,
      //     1529359200000,
      //     // 1529485464000,
      //     1529360169904,
      //     // 5040000,
      //     969904,
      //
      //   ],
      //   itemStyle: {
      //     normal: {
      //       color: "#bd6d6c",
      //     }
      //   }
      // }
    ];
    let dataCount = 10;

    let categories = ['conflict','jobs', 'supervision'];
    if(this.$root.local=="zh-CN"){
      categories = ['冲突','工作', '监督'];
    }
    //设定任务类型
    let types = [{
        name: 'JS Heap',
        color: '#7b9ce1'
      },
      {
        name: 'Documents',
        color: '#bd6d6c'
      },
      {
        name: 'Nodes',
        color: '#75d874'
      },
      {
        name: 'Listeners',
        color: '#e0bc78'
      },
      {
        name: 'GPU Memory',
        color: '#dc77dc'
      },
      {
        name: 'GPU',
        color: '#72b362'
      }
    ];


    // Generate mock data
    // echarts.util.each(categories, function(category, index) {
    //   //修改此处以填入真实数据
    //   let baseTime = new Date().setHours(0, 0, 0, 0);
    //   for (let i = 0; i < dataCount; i++) {
    //     let typeItem = types[Math.round(Math.random() * (types.length - 1))];
    //     let duration = Math.round(Math.random() * 10000000);
    //     data.push({
    //       name: typeItem.name,
    //       value: [
    //         index,
    //         baseTime,
    //         baseTime += duration,
    //         duration,
    //       ],
    //       itemStyle: {
    //         normal: {
    //           color: typeItem.color,
    //         }
    //       }
    //     });
    //     baseTime += Math.round(Math.random() * 2000000);
    //   }
    // });
    //
    let startTime = new Date();
    startTime.setHours(0, 0, 0, 0);
    let endTime = new Date();
    endTime.setDate(new Date().getDate() + 5);
    endTime.setHours(23, 59, 59, 999);
    return {
      data,
      categories: categories,
      chart: null,
      startTime: startTime,
      endTime: endTime,
    };
  },
  watch: {
    // 观察option的变化
    // option: {
    //   handler(newVal, oldVal) {
    //     if (this.chart) {
    //       if (newVal) {
    //         this.chart.setOption(newVal);
    //       } else {
    //         this.chart.setOption(oldVal);
    //       }
    //     } else {
    //       this.init();
    //     }
    //   },
    //   deep: true //对象内部属性的监听，关键。
    // }
  },
  computed: {
    option: function() {
      let now = new Date();
      return {
        tooltip: {},
        title: {
          // text: 'Profile',
          left: 'center'
        },
        legend: {
          //data: ['bar', 'error']
        },
        dataZoom: [{
          type: 'inside',
          filterMode: 'weakFilter',
          orient: 'vertical',
          startValue: +new Date(),
          endValue: +new Date().setHours(new Date().getHours() + 4),
        },
        {
          type: 'slider',
          filterMode: 'weakFilter',
          orient: 'vertical',
          startValue: +new Date(),
          endValue: +new Date().setHours(new Date().getHours() + 4),
          labelFormatter: function (value) {
            let date=new Date(value);
            // let date=new Date(value).toUTCString();
            let mm=checkMin(date.getMonth());
            let dd=checkMin(date.getDay());
            let h=checkMin(date.getHours());
	          let m=checkMin(date.getMinutes());
	          let s=checkMin(date.getSeconds());// 在小于10的数字前加一个‘0’
            return mm+"/"+dd+"\r\n"+h+":"+m+":"+s;
            }
        },
      ],
        grid: {
          //height:300
        },
        xAxis: {
          data: this.categories,
          splitLine: {
            show: true,
          },

        },
        yAxis: {
          // min: startTime,
          // min: tmpInteval[0],
          // max: tmpInteval[1],
          inverse: true,
          scale: true,
          min: +this.startTime,
          max: +this.endTime,
          axisLabel: {
            formatter: function(val) {
              let date = new Date(val);
              return date.getHours() + ":" + checkMin(date.getMinutes());
            }
          },
          axisPointer: {
            show: true,
            snap: false,
            label: {
              show: true,
              formatter: function(params) {
                // 假设此轴的 type 为 'time'。
                let date = new Date(params.value);
                return date.getHours() + ":" + checkMin(date.getMinutes());
              },
            }
          }
          //  axisLine:{
          //
          //  }
        },
        series: [{
          type: 'custom',
          renderItem: function(params, api) {
            let categoryIndex = api.value(0);
            let start = api.coord([categoryIndex, api.value(1)]);
            let end = api.coord([categoryIndex, api.value(2)]);
            let width = api.size([1, 1])[0] * 0.6;

            return {
              type: 'rect',
              shape: echarts.graphic.clipRectByRect({
                x: start[0] - width / 2,
                y: start[1],
                width: width,
                height: end[1] - start[1],
              }, {
                x: params.coordSys.x,
                y: params.coordSys.y,
                width: params.coordSys.width,
                height: params.coordSys.height
              }),
              style: api.style()
            };
          },
          itemStyle: {
            normal: {
              opacity: 0.8
            }
          },
          encode: {
            x: 0,
            y: [1, 2]
          },
          markLine: {
            lineStyle: {
              normal: {
                type: 'solid'
              }
            },
            data: [{
              yAxis: now,
              name: "now",
              tooltip: {
                trigger: 'item',
                formatter: function(val) {
                  return "Now:" + now.toLocaleTimeString();
                }
              },
              label: {
                position: "start",
                formatter: function(val) {
                  return now.getHours() + ":" + checkMin(now.getMinutes())
                }
              },
            }]
          },
          tooltip: {
            trigger: 'item',
            formatter: function(val) {
              return val.name + "<br/>" +
                "Start:" + new Date(val.value[1]).toLocaleTimeString() + "<br/>" +
                "End  :" + new Date(val.value[2]).toLocaleTimeString() + "<br/>" +
                "Use  :" + (val.value[3] / 1000 / 60).toFixed(0) + " min <br/>";
            }

          },
          data: this.data,
        }]
      };
    },
  },
  methods: {
    /*同步数据*/
    synData: function() {
      // console.log("获取数据");
      let $vm = this;
      // this.spinShow=true;
      let url = "/api/thing/list/todo";
      // console.log(url);
      //因axios 不支持同步，选中ajax
      $.ajax({
        method: "get",
        url: url,
        async: true,
        success: function(data, textStatus, jqXHR) {
          //console.log("data");
          //console.log(data);
          $vm.list = buildList(data);

          $vm.tree = buildTree(data);
          // console.log("$vm.tree");
          // console.log($vm.tree);
          calculate_weight_list($vm.list);
          treeHeightList($vm.tree);
          serialization_priority($vm.list);
          // console.log("$vm.list");
          // console.log($vm.list);
          // $vm.spinShow=false;
          // for (let i = 0; i < $vm.list.length; i++) {
          //   console.log($vm.list[i]['Attribute']['time']['data']['endTime'] + " " + $vm.list[i]['calculateWeight'] + " " + $vm.list[i]['height'])
          // }
          //
          //          $vm.fillIin($vm.list);
          $vm.data = matching($vm.list, $vm.startTime, $vm.endTime);
          $vm.chart.setOption($vm.option);
          //打开任务详情视图
          if ($vm.data != false) {
            $vm.$router.push({
              name: "calendar_day",
              query: {
                view:'calendar',
                tid: $vm.data[0].value[4]._id
              }
            });
          }
        },
      });
    },
    fillIin: function(thingList) {
      //this.data = [];
      console.log(this);
      for (let i = 0; i < thingList.length; i++) {
        if (thingList[i]['Attribute']['time']['data']['fixed']) { //固定事件
          this.data.push({
            name: thingList[i]['Attribute']['title'],
            value: [
              0, +new Date(thingList[i]['Attribute']['time']['data']['startTime']), +new Date(thingList[i]['Attribute']['time']['data']['startTime']) + parseInt(thingList[i]['Attribute']['time']['data']['workTime']) * 60000,
              parseInt(thingList[i]['Attribute']['time']['data']['workTime']) * 60000,
            ],
            itemStyle: {
              normal: {
                color: '#bd6d6c',
              }
            }
          });
        }
      }
      return this.data;
    },
  },
  mounted() {
    let $vm = this;
    this.chart = echarts.init(document.getElementById('chart-container'));
    // 使用刚指定的配置项和数据显示图表。
    this.chart.on('click', function(params) {
      $vm.$router.push({
        name: "calendar_day",
        query: {
          view: 'mission',
          tid: params.data.value[4]._id,
        }
      });
    });

    this.synData();
    //当窗口改变时resize图表
    window.onresize =this.chart.resize;
    // setInterval(function() {
    //     // 每分钟刷新一次
    //   },
    //   60000); //1 min
  }
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped>

</style>
