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

function setDayOfWeek(date=new Date(),day=0){
  return new Date(date-(new Date(date).getDay()-day)*24*60*60*1000);
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

    ];

    let categories = [''];//默认语言

    if (this.$root.local == "zh-CN") {
      categories = [''];
    }

    let startTime = setDayOfWeek(new Date(),0);
    startTime.setHours(0, 0, 0, 0);

    let endTime = setDayOfWeek(new Date(),6);
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
        // this.processData();
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
        dataZoom: [
          {
            type: 'inside',
            filterMode: 'weakFilter',
            orient: 'vertical',
            startValue: +new Date(),
            endValue: +new Date().setHours(new Date().getMonth() + 4),
          },
          {
            type: 'slider',
            filterMode: 'weakFilter',
            orient: 'vertical',
            startValue: +new Date(),
            endValue: +new Date().setHours(new Date().getMonth() + 4),

            labelFormatter: function(value) {
              let date = new Date(value);
              // let date=new Date(value).toUTCString();
              let mm = checkMin(date.getMonth());
              let dd = checkMin(date.getDay());
              let h = checkMin(date.getMonth());
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
          interval: 86400000,// one day
          axisLabel: {
            formatter: function(val) {
              let date = new Date(val);
              return date.getMonth() + "/" + date.getDate();
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
                return date.getMonth() + "/" + date.getDate();
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
              name: "Today",
              tooltip: {
                trigger: 'item',
                formatter: function(val) {
                  return "Today: " + now.getDate() + "/" + now.getDate();
                }
              },
              label: {
                position: "start",
                formatter: function(val) {
                  return now.getDate() + "/" + now.getDate();
                }
              },
            }]
          },
          tooltip: {
            trigger: 'item',
            formatter: function(val) {
              return val.name + "<br/>" +
                "Start:" + new Date(val.value[1]).toLocaleString() + "<br/>" +
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
    openActivity(id){
      this.$router.push({
          path: '/activity',
          query: {
            'id':id+"",
            'currentTab':"attribute"
          }
        });
    },
    processData: function() {
      let $vm = this;
      // $vm.list = buildList(this.$root.activities);
      // $vm.tree = buildTree(this.$root.activities);
      calculate_weight_list($vm.list);
      // treeHeightList($vm.tree);
      serialization_priority($vm.list);
      $vm.data = matching($vm.list, $vm.startTime, $vm.endTime);
      // console.log($vm.data);
      //画出有数据的图表
      $vm.chart.setOption($vm.option);
    },
    /*同步数据*/
    synData: function() {
      // console.log("获取数据");
      let $vm = this;
      // this.spinShow=true;
      let url = "/api/v1/activity";
      // console.log(url);
      //因axios 不支持同步，选中ajax
      $.ajax({
        method: "get",
        url: url,
        async: true,
        success: function(data, textStatus, jqXHR) {
          //console.log("data");
          //console.log(data);
          // $vm.list = buildList(data);
          //
          // $vm.tree = buildTree(data);
          // console.log("$vm.tree");
          // console.log($vm.tree);
          calculate_weight_list($vm.list);
          treeHeightList($vm.tree);
          serialization_priority($vm.list);
          // console.log("$vm.list");
          // console.log($vm.list);
          // $vm.spinShow=false;
          // for (let i = 0; i < $vm.list.length; i++) {
          //   console.log($vm.list[i]['until_at'] + " " + $vm.list[i]['calculateWeight'] + " " + $vm.list[i]['height'])
          // }
          //
          //          $vm.fillIin($vm.list);
          // $vm.data=[
          //     {
          //     name: "typeItem.name",
          //     value: [
          //       1,
          //       // 1529480424000,
          //       +new Date(),
          //       // 1529485464000,
          //       +new Date()+5040000,
          //       5040000,
          //       {
          //         id:0,
          //       }
          //     ],
          //     itemStyle: {
          //       normal: {
          //         color: "#bd6d6c",
          //       }
          //     }
          //   }
          // ];


          $vm.data = matching($vm.list, $vm.startTime, $vm.endTime);
          // console.log($vm.data);
          //画出有数据的图表
          $vm.chart.setOption($vm.option);
          //打开任务详情视图
          // if ($vm.data != false) {
          //   $vm.$router.push({
          //     name: "calendar_day",
          //     query: {
          //       view: 'calendar',
          //       tid: $vm.data[0].value[4].id
          //     }
          //   });
          // }
        },
      });
    },
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

    // this.processData();
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
