<template>
<div id="chart-container" style="width: 100%;height:100%;">
</div>
</template>

<script>
// import mission from '../../activity/mission/mission';
import echarts from 'echarts'
// let chart = null
// let $chart = null
//let myChart = echarts.init(document.getElementById('main'));
// 指定图表的配置项和数据


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
function find_position(activity, activitytree) {
  // console.log("activitytree");
  // console.log(activitytree);
  if (activitytree._id == activity.Attribute.fatherId) {
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
  activity['calculateWeight'] = activity['Attribute']['importance'];

  if (activity['Attribute']['time']['data']['workTime'] == 0) {
    activity['calculateWeight'] = parseFloat(activity['calculateWeight']) + 0.5;
  } else {
    let startTime = new Date(activity['Attribute']['time']['data']['startTime']);
    let endTime = new Date(activity['Attribute']['time']['data']['endTime']);
    let a = (endTime - startTime) / 60000; //可工作事件-分钟
    if (activity['Attribute']['time']['data']['workTime'] * 3 > a) {
      activity['calculateWeight'] = parseFloat(activity['calculateWeight']) + 0.5;
    }
    if (activity['Attribute']['time']['data']['workTime'] * 5 > a) {
      activity['calculateWeight'] = parseFloat(activity['calculateWeight']) + 0.5;
    }
    if (activity['Attribute']['time']['data']['workTime'] * 10 > a) {
      activity['calculateWeight'] = parseFloat(activity['calculateWeight']) + 0.5;
    }
  }
  return activity;
}

function serialization_priority(activityList) {
  //对高度
  activityList.sort(function(a, b) {
    return parseFloat(b['height']) - parseFloat(a['height']);
  });
  //对重要性排序
  activityList.sort(function(a, b) {
    return parseFloat(a['calculateWeight']) - parseFloat(b['calculateWeight']);
  });
  //对截止时间
  activityList.sort(function(a, b) {
    return new Date(a['Attribute']['time']['data']['endTime']) - new Date(b['Attribute']['time']['data']['endTime']);
  });
}

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

function checkMin(i) {
  if (i < 10)
    return "0" + i;
  else return i;
}


export default {
  name: 'daybody',
  data() {
    let data = [
      {
      name: "typeItem.name",
      value: [
        1,
        // 1529480424000,
      1529359200000,
        // 1529485464000,
      1529360169904,
        // 5040000,
      969904,

      ],
      itemStyle: {
        normal: {
          color: "#bd6d6c",
        }
      }
    }
  ];
    let dataCount = 10;
    let startTime = +new Date();
    let categories = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
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
    return {
      data,
      categories: categories,
      chart: null,

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
        }],
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
          min: function() {
            let date = new Date();
            return date.setHours(0, 0, 0, 0);
          },
          max: function() {
            let date = new Date();
            return date.setHours(23, 59, 59, 999);
          },
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
      console.log("获取数据");
      let $vm = this;
      // this.spinShow=true;
      let url = "/api/activity/list/todo";
      console.log(url);
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
          $vm.fillIin($vm.list);
          console.log($vm.option);
          $vm.chart.setOption($vm.option);
        },
      });
    },
    fillIin: function(activityList) {
      //this.data = [];
      console.log(this);
      for (let i = 0; i < activityList.length; i++) {
        if (activityList[i]['Attribute']['time']['data']['fixed']) { //固定事件
          let index = parseInt((new Date(activityList[i]['Attribute']['time']['data']['startTime']) - new Date().setHours(23, 59, 59, 999)) / 1000 / 60 / 60 / 24);
          if (index < 7) {
            console.log(new Date(activityList[i]['Attribute']['time']['data']['startTime']));
            console.log(new Date(activityList[i]['Attribute']['time']['data']['endTime']));
            this.data.push({
              // name: activityList[i]['Attribute']['title'],
              name: "xxxxxx",
              value: [
                0,
                +new Date(activityList[i]['Attribute']['time']['data']['startTime']),
                +new Date(activityList[i]['Attribute']['time']['data']['startTime'])+parseInt(activityList[i]['Attribute']['time']['data']['workTime']) * 60000,
                parseInt(activityList[i]['Attribute']['time']['data']['workTime']) * 60000,
              ],
              itemStyle: {
                normal: {
                  color: '#bd6d6c',
                }
              }
            });
            break;
          }
        }
      }
      return this.data;
    },
  },
  mounted() {
    console.log(this);
    this.chart = echarts.init(document.getElementById('chart-container'));
    // 使用刚指定的配置项和数据显示图表。
    //this.chart.setOption(this.option);
    // console.log(this.option);
    this.synData();


    setInterval(function() {
        // 每分钟刷新一次
      },
      60000); //1 min
  }
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped>

</style>
