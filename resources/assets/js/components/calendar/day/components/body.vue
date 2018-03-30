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

export default {
  name: 'daybody',
  data() {

    let data = [];
    let dataCount = 10;
    let startTime = +new Date();
    let categories = ['周一', '周二', '周三'];
    let types = [
      {name: 'JS Heap', color: '#7b9ce1'},
      {name: 'Documents', color: '#bd6d6c'},
      {name: 'Nodes', color: '#75d874'},
      {name: 'Listeners', color: '#e0bc78'},
      {name: 'GPU Memory', color: '#dc77dc'},
      {name: 'GPU', color: '#72b362'}
    ];

    let tmpInteval=[new Date(),new Date()];//设置当天的起点与终点
    tmpInteval[0].setHours(0,0,0,0);
    tmpInteval[1].setHours(23,59,59,999);
    function checkMin(i)
    {
      if (i<10)
      return "0" + i;
      else return i;
    }
    // Generate mock data
    echarts.util.each(categories, function (category, index) {
      let baseTime = startTime;
      for (let i = 0; i < dataCount; i++) {
        let typeItem = types[Math.round(Math.random() * (types.length - 1))];
        let duration = Math.round(Math.random() * 10000);
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
        baseTime += Math.round(Math.random() * 2000);
      }
    });

    function renderItem(params, api) {
      let categoryIndex = api.value(0);
      let start = api.coord([categoryIndex,api.value(1)]);
      let end = api.coord([categoryIndex,api.value(2)]);
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
      option : {
        tooltip: {
          // formatter: function (val) {
          //    let date=new Date(val);
          // return {
          //   {date.getHours()+":"+checkMin(date.getMinutes())}
          //   };
          // }

        },
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
          orient:'vertical',
        }],
        grid: {
          //height:300
        },
        xAxis: {
          data: categories,
          splitLine:{
            show:true,
          },

        },
        yAxis: {
          min: startTime,
          // min: tmpInteval[0],
          // max: tmpInteval[1],
          inverse:true,
          scale: true,
          axisLabel: {
            formatter: function (val) {
              let date=new Date(val);
              return date.getHours()+":"+checkMin(date.getMinutes());
            }
          },
          axisPointer:{
            show:true,
            snap:false,
            label:{
              show:true,
              formatter:function (params) {
                // 假设此轴的 type 为 'time'。
                let date=new Date(params.value);
                return date.getHours()+":"+checkMin(date.getMinutes());
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
          markLine : {
            lineStyle: {
              normal: {
                type: 'solid'
              }
            },
            // symbol:[none,none],
            data : [
               {
              name: '当前时间',
              yAxis: new Date(),
             }
            ]
          },
          data: data,
        }]
      },
    };
  },

  mounted () {
    $chart = document.getElementById('chart-container');
    //  $chart = this.$el.querySelector('.chart-container');
    chart = echarts.init($chart);
    // 使用刚指定的配置项和数据显示图表。
    chart.setOption(this.option);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
