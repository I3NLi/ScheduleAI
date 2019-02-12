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
//根据activity中的fid，组成嵌套关系
function buildTree(buildlist) {
  let list=buildlist.slice(0);
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
function find_position(activity, activitytree) {
  // console.log("activitytree");
  // console.log(activitytree);
  if (activitytree.id == activity.parent_id) {
    //提高子节点的重要性到父节点
    if (activitytree.importance > activity.importance) {
      activity['calculateWeight'] = activitytree.importance;
    }
    // console.log("has father");
    if (activitytree.children != undefined) {
      // console.log("child exist");
      activitytree.children.push(activity);

      //console.log(activitytree.children);
    } else {
      // console.log("child no exist");
      activitytree.children = [activity];
    }
    return activitytree;
  }
  // console.log("no father in root");

  if (activitytree.children != undefined) {
    // console.log("child exist");
    for (let i = 0; i < activitytree.children.length; i++) {
      let tmp = find_position(activity, activitytree.children[i]);
      if (tmp != false) {
        activitytree.children[i] = tmp;
        // console.log("find father in child");
        return activitytree;
      }
    }
    // console.log("no father in child");
  }
  // console.log("child not exist");
  return false;
}

/*
给定一个activitylist，重新计算所有权重
 */
function calculate_weight_list(activityList) {
  for (let i = 0; i < activityList.length; i++) {
    calculate_weight(activityList[i]);
  }
  return activityList;
}
/*
计算一个activity的权重
 */
function calculate_weight(activity) { //计算事件的权重
  if (typeof activity['calculateWeight']=="undefined"){
    activity['calculateWeight'] = activity['importance'];
  }
if (activity['estimated_time_cost'] == 0) {
  activity['calculateWeight'] = parseFloat(activity['calculateWeight']) + 0.5;
} else {
  let startTime = new Date(activity['start_at']);
  let endTime = new Date(activity['until_at']);
  let a = (endTime - startTime) / 60000; //可工作事件-分钟
  if (activity['estimated_time_cost'] * 3 > a) {
    activity['calculateWeight'] = parseFloat(activity['calculateWeight']) + 0.5;
  }
  if (activity['estimated_time_cost'] * 5 > a) {
    activity['calculateWeight'] = parseFloat(activity['calculateWeight']) + 0.5;
  }
  if (activity['estimated_time_cost'] * 10 > a) {
    activity['calculateWeight'] = parseFloat(activity['calculateWeight']) + 0.5;
  }
}
return activity;
}

/*排序*/
function serialization_priority(activityList) {
  //对高度
  activityList.sort(function(a, b) {
    return parseFloat(b['height']) - parseFloat(a['height']);
  });
  //对重要性排序
  activityList.sort(function(a, b) {
    if (parseFloat(b['calculateWeight']) - parseFloat(a['calculateWeight']) == 0) {
      //对截止时间
      return new Date(a['until_at']) - new Date(b['until_at']);
    }
    return  parseFloat(a['calculateWeight'])- parseFloat(b['calculateWeight']);
  });
  //对截止时间
  // activityList.sort(function(a, b) {
  //   return new Date(a['until_at']) - new Date(b['until_at']);
  // });
}

/*获取一个list中所有节点的深度*/
function treeHeightList(activityTreeList) {
  for (let i = 0; i < activityTreeList.length; i++) {
    treeHeight(activityTreeList[i]);
  }
  return activityTreeList;
}
/*
获取一个节点的深度
 */
function treeHeight(activityTreeNode) {
  let result = 0;
  //console.log(activityTreeNode.children);
  if (activityTreeNode.children != undefined) {
    //console.log(activityTreeNode.children.length);
    for (let i = 0; i < activityTreeNode.children.length; i++) {
      let tmp = treeHeight(activityTreeNode.children[i])
      if (tmp > result)
        result = tmp;
    }
  }
  result++;
  activityTreeNode['height'] = result;
  return result;
}

/*
匹配到日历

@pause 事件之间的休息事件 单位min

 */
function matching(activityList, startTime, endTime, pause = 5) {
  let result = [];
  let tmp = activityList.slice(0);
  //将固定事件加入结果，从待排序中剔除固定事件,
  for (let i = 0; i < tmp.length; i++) {
    if (tmp[i]['estimated_time_cost'] < 0) {
      result.push({
        name: tmp[i]['name'],
        value: [
          //列数
          1,
          //起始时间
          +new Date(tmp[i]['start_at']),
          //结束时间
          +new Date(tmp[i]['until_at']),
          //工作时间
          new Date(tmp[i]['until_at']) - new Date(tmp[i]['start_at']),
          //数据节点
          tmp[i],
        ],
        itemStyle: {
          normal: {
            color: tmp[i].setting.color ? tmp[i].setting.color : '#' + Math.floor(Math.random() * 16777215).toString(16),
          }
        }
      });
      tmp.splice(i, 1);
      i--;
    }
  }

  result.sort(function(a, b) {
    return a['value'][2] - b['value'][2];
  });

  // console.log(result);
  let baseTime = +new Date();
  let free = 0;
  let resultCounter = 0;
  let died = false; //用来标识是否能够将所有的任排进去
  let fixedLength = result.length;

  while (tmp.length != 0) {
    //寻找空档


    while (resultCounter < fixedLength) {
      //当前时间大于结束时间
      if (baseTime - result[resultCounter]['value'][2] > 0) {
        resultCounter++;
        // console.log("跳过因为当前时间大于结束时间");
        continue;
      }
      //当前时间大于结束时间并且小于开始时间
      if (baseTime - result[resultCounter]['value'][1] >= 0) {
        baseTime = result[resultCounter]['value'][2] + pause * 60000;
        resultCounter++;
        // console.log("跳过因为当前时间大于结束时间");
        continue;
      }
      //开始时间大于basetime
      if (result[resultCounter]['value'][1] - baseTime > 0) { //start-base
        free = result[resultCounter]['value'][1] - baseTime; //start-base
        // console.log("Afree:" + free / 60000 + "min");
        break;
      }
    }

    //如果查找了所有已存在的数据
    if (resultCounter >= fixedLength) {
      free = endTime - baseTime;
      // console.log("Bfree:" + free / 60000);
      died = true;
      //break;
    }

    //寻找合适插入的任务
    for (let i = 0; i < tmp.length; i++) {
      //如果当前的事件需要的工作事件低于空闲时间
      if (free - (parseInt(tmp[i]['estimated_time_cost']) * 1000 + pause * 60000) > 0) {
        //检查
        if (!isInclude(tmp[i].children, tmp)) {
          //  console.log(baseTime);
          result.push({
            name: tmp[i]['name'],
            value: [
              //列数
              0,
              //起始时间
              +baseTime,
              //结束时间
              parseInt(tmp[i]['estimated_time_cost']) * 1000 + baseTime,
              //工作时间
              parseInt(tmp[i]['estimated_time_cost']) * 1000,
              //数据节点
              tmp[i],
            ],
            itemStyle: {
              normal: {
                // color: "#77bd6c",
                color: tmp[i].setting.color ? tmp[i].setting.color : '#' + Math.floor(Math.random() * 16777215).toString(16),
              }
            }
          });
          // console.log("basetimeB1:"+ new Date(baseTime).toLocaleString());
          baseTime = parseInt(tmp[i]['estimated_time_cost']) * 1000 + baseTime + pause * 60000;
          // console.log("basetimeB:"+ new Date(baseTime).toLocaleString());
          free = free - (parseInt(tmp[i]['estimated_time_cost']) * 1000 + pause * 60000);
          // console.log('free-' + tmp[i]['name'] + ':' + free / 60000);
          tmp.splice(i, 1); //删除元素
          i--; //校准index
          died = false;
        }
      }
    }
    //未能在截至时间前将所有任务排进去
    if (died == true) {
      alert("result not find");
      return false;
    }


    if (resultCounter < fixedLength) {
      baseTime = result[resultCounter]['value'][2] + pause * 60000;
      resultCounter++;
    }
  }
  // console.log("result");
  // console.log(result);
  return result;
}

function hasId(id, list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id == id) {
      return list[i];
    }
  }
  return false;
}

function checkMin(i) {
  if (i < 10)
    return "0" + i;
  else return i;
}
/*检查两个数组是否存在交集*/
function isInclude(array1, array2) {
  if (array1 == undefined) {
    // console.log("array1 == undefined");
    return false;
  }
  if (array2 == undefined) {
    // console.log("array2 == undefined");
    return false;
  }
  for (let m = 0; m < array1.length; m++) {
    for (let n = 0; n < array2.length; n++) {
      if (array1[m].id == array2[n].id) {
        return true;
      }
    }
  }
  return false;
}
//鼠标滑过
function tooltipFunction(val) {
  return val.name + "<br/>" +
    "Start:" + new Date(val.value[1]).toLocaleString() + "<br/>" +
    "End  :" + new Date(val.value[2]).toLocaleTimeString() + "<br/>" +
    "Use  :" + (val.value[3] / 1000 / 60).toFixed(0) + " min <br/>"+
    "Weight:"+ val.value[4].calculateWeight+"<br/>";
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


    let categories = ['Todo', 'Event', 'Conflict'];

    if (this.$root.local == "zh-CN") {
      categories = ['待办', '事件', '冲突'];
    }

    let startTime = new Date();
    startTime.setHours(0, 0, 0, 0);
    let endTime = new Date();
    endTime.setDate(new Date().getDate() + 5);
    endTime.setHours(23, 59, 59, 999);
    return {
      focus: null,
      data,
      categories: categories,
      chart: null,
      startTime: startTime,
      endTime: endTime,
    };
  },
  watch: {
    "$root.activities": {
      handler() {
        this.processData();
      },
      deep: false,
    }
  },
  computed: {
    option: function() {
      let now = new Date();
      return {
        tooltip: {},
        title: {
          text: this.startTime.toLocaleDateString(),
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
            labelFormatter: function(value) {
              let date = new Date(value);
              // let date=new Date(value).toUTCString();
              let mm = checkMin(date.getMonth());
              let dd = checkMin(date.getDay());
              let h = checkMin(date.getHours());
              let m = checkMin(date.getMinutes());
              let s = checkMin(date.getSeconds()); // 在小于10的数字前加一个‘0’
              return mm + "/" + dd + "\r\n" + h + ":" + m + ":" + s;
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
          interval: 3600000, // one day
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
          label: {
            normal: {
              show: true,
              position: 'inside',

              // rich: {
              //   a: {
              //       width: '100%',
              //   },
              // },
              formatter: function(val) {
                return val.name + "\n";

                // + "Start:" + new Date(val.value[1]).toLocaleString() + "\n" +
                //   "End  :" + new Date(val.value[2]).toLocaleTimeString() + "\n" +
                //   "Use  :" + (val.value[3] / 1000 / 60).toFixed(0) + " min \n";
              },

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
            formatter: tooltipFunction,

          },
          data: this.data,
        }]
      };
    },
  },
  methods: {
    openActivity(id) {
      this.$router.push({
        path: '/activity',
        query: {
          'id': id + "",
          'currentTab': "attribute"
        }
      });
    },
    processData: function() {
      console.log("calendar processData");
      let $vm = this;
      $vm.list = buildList(this.$root.activities);
      $vm.tree = buildTree(this.$root.activities);
      calculate_weight_list($vm.list);
      // treeHeightList($vm.tree);
      serialization_priority($vm.list);
      $vm.data = matching($vm.list, $vm.startTime, $vm.endTime);
      // console.log($vm.data);
      //画出有数据的图表
      $vm.chart.setOption($vm.option);
      // console.log(this.$root.activities);
    },
    /*同步数据*/
    // synData: function() {
    //   // console.log("获取数据");
    //   let $vm = this;
    //   // this.spinShow=true;
    //   let url = "/api/v1/activity";
    //   // console.log(url);
    //   //因axios 不支持同步，选中ajax
    //   $.ajax({
    //     method: "get",
    //     url: url,
    //     async: true,
    //     success: function(data, textStatus, jqXHR) {
    //       //console.log("data");
    //       //console.log(data);
    //       $vm.list = buildList(data);
    //
    //       $vm.tree = buildTree(data);
    //       // console.log("$vm.tree");
    //       // console.log($vm.tree);
    //       calculate_weight_list($vm.list);
    //       treeHeightList($vm.tree);
    //       serialization_priority($vm.list);
    //       // console.log("$vm.list");
    //       // console.log($vm.list);
    //       // $vm.spinShow=false;
    //       // for (let i = 0; i < $vm.list.length; i++) {
    //       //   console.log($vm.list[i]['until_at'] + " " + $vm.list[i]['calculateWeight'] + " " + $vm.list[i]['height'])
    //       // }
    //       //
    //       //          $vm.fillIin($vm.list);
    //       // $vm.data=[
    //       //     {
    //       //     name: "typeItem.name",
    //       //     value: [
    //       //       1,
    //       //       // 1529480424000,
    //       //       +new Date(),
    //       //       // 1529485464000,
    //       //       +new Date()+5040000,
    //       //       5040000,
    //       //       {
    //       //         id:0,
    //       //       }
    //       //     ],
    //       //     itemStyle: {
    //       //       normal: {
    //       //         color: "#bd6d6c",
    //       //       }
    //       //     }
    //       //   }
    //       // ];
    //
    //
    //       $vm.data = matching($vm.list, $vm.startTime, $vm.endTime);
    //       // console.log($vm.data);
    //       //画出有数据的图表
    //       $vm.chart.setOption($vm.option);
    //       //打开任务详情视图
    //       // if ($vm.data != false) {
    //       //   $vm.$router.push({
    //       //     name: "calendar_day",
    //       //     query: {
    //       //       view: 'calendar',
    //       //       tid: $vm.data[0].value[4].id
    //       //     }
    //       //   });
    //       // }
    //     },
    //   });
    // },
    fillIin: function(activityList) {
      //this.data = [];
      // console.log(this);
      for (let i = 0; i < activityList.length; i++) {
        if (activityList[i]['estimated_time_cost'] < 0) { //固定事件
          this.data.push({
            name: activityList[i]['name'],
            value: [
              0,
              +new Date(activityList[i]['start_at']),
              +new Date(activityList[i]['start_at']) + parseInt(activityList[i]['estimated_time_cost']) * 1000,
              parseInt(activityList[i]['estimated_time_cost']) * 1000,
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
      if ($vm.focus == params.data.value[4].id) {
        $vm.openActivity(params.data.value[4].id)
      } else {
        $vm.focus = params.data.value[4].id
      }
    });

    //画出无数据的图表
    $vm.chart.setOption($vm.option);

    this.processData();
    //当窗口改变时resize图表
    window.onresize = this.chart.resize;
    // setInterval(function() {
    //     // 每分钟刷新一次
    //   },
    //   1000); //1 min
  }
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped>

</style>
