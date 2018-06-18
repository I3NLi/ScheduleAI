<template>
<div id="chart-container" style="width: 100%;height:100%;">
</div>
</template>

<script>
// import mission from '../../thing/mission/mission';
import echarts from 'echarts'
let chart = null
let $chart = null
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

export default {
  name: 'daybody',
  data() {
    let data = [];
    let tree;
    let list;
    let dataCount = 10;
    let startTime = +new Date();
    let now = new Date();
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

    function checkMin(i) {
      if (i < 10)
        return "0" + i;
      else return i;
    }
    // Generate mock data
    echarts.util.each(categories, function(category, index) {
      //修改此处以填入真实数据
      let baseTime = new Date().setHours(0, 0, 0, 0);
      for (let i = 0; i < dataCount; i++) {
        let typeItem = types[Math.round(Math.random() * (types.length - 1))];
        let duration = Math.round(Math.random() * 10000000);
        data.push({
          name: typeItem.name,
          value: [
            index,
            baseTime,
            baseTime += duration,
            duration
          ],
          itemStyle: {
            normal: {
              color: typeItem.color
            }
          }
        });
        baseTime += Math.round(Math.random() * 2000000);
      }
    });

    function renderItem(params, api) {
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
    }

    return {
      chart: null,
      option: {
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
          data: categories,
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
          renderItem: renderItem,
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
          data: data,
        }]
      },
    };
  },
  watch: {
    // 观察option的变化
    option: {
      handler(newVal, oldVal) {
        if (this.chart) {
          if (newVal) {
            this.chart.setOption(newVal);
          } else {
            this.chart.setOption(oldVal);
          }
        } else {
          this.init();
        }
      },
      deep: true //对象内部属性的监听，关键。
    }
  },
  methods: {
    /*同步数据*/
    synData: function() {
      let $vm = this;
      // this.spinShow=true;
      let url = "/api/thing/list/todo";
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
          console.log("$vm.tree");
          console.log($vm.tree);
          calculate_weight_list($vm.list);
          treeHeightList($vm.tree);
          serialization_priority($vm.list);
          console.log("$vm.list");
          console.log($vm.list);
          // $vm.spinShow=false;
          for (let i = 0; i < $vm.list.length; i++) {
            console.log($vm.list[i]['Attribute']['time']['data']['endTime'] + " " + $vm.list[i]['calculateWeight'] + " " + $vm.list[i]['height'])

          }
        },
      });



    }
  },
  mounted() {
    chart = echarts.init(document.getElementById('chart-container'));
    // 使用刚指定的配置项和数据显示图表。
    chart.setOption(this.option);
    this.synData();
    console.log("获取数据");

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
