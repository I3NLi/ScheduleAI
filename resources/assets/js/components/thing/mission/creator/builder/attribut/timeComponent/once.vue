<!-- 计划用时
时间
单次
起始条件
立即（创建时，默认）
时刻
终止条件
重复
每天
每周
全部
工作日
自定义
每月
每年
日历
任务时长
重要性
完成条件 计划
all 默认
完成表单
完成所有的子任务
取得token

标签 -->
<template>
  <div>
    <FormItem label="Start Condition">
      <Select v-model="data.startCondition">
        <Option
        v-for="startCondition in startConditions"
        :value="startCondition.value"
        :key="startCondition.value"
        placeholder="startCondition"
        filterable>
        {{ startCondition.label }}
      </Option>
    </Select>
  </FormItem>

  <FormItem label="Start Time" v-show="data.startCondition=='datetime'">
    <DatePicker v-model="data.startTime" type="datetime" placeholder="Select date" ></DatePicker>
  </FormItem>

  <FormItem label="End Time">
    <DatePicker v-model="data.endTime" :options="endTimeoptions" type="datetime" placeholder="Select date" ></DatePicker>
  </FormItem>

  <FormItem label="Work Time">
    <Row>
      <Col span="6">
        <Select v-model="data.workTimeType">
          <Option
          v-for="workTimeOption in workTimeOptions"
          :value="workTimeOption.value"
          :key="workTimeOption.value"
          placeholder="workTimeOption"
          filterable>
          {{ workTimeOption.label }}
        </Option>
      </Select>
    </Col>
    <Col span="2" style="text-align: center">-</Col>
    <Col span="11">
      <InputNumber :min="1" v-model="data.workTime" v-show="showWorkTime">
        <span slot="append">min</span>
      </InputNumber>
    </Col>
  </Row>


</FormItem>
</div>
</template>

<script>
// import Vue from 'vue';
// import config from '@/config';
import InputTag from 'vue-input-tag'
export default {
  name: 'attr',
  props: {
    data:Object,
  },
  data() {
    let vm=this;
    return {
      startConditions:[
        {
          value: 'immediately',
          label: 'When activated'
        },
        {
          value: 'datetime',
          label: 'datetime'
        },

      ],
      // importances:[
      //   {
      //     value: '1',
      //     label: 'Insignificant',
      //   },
      //   {
      //     value: '2',
      //     label: 'unimportant',
      //   },
      //   {
      //     value: '3',
      //     label: 'normal'
      //   },
      //   {
      //     value: '4',
      //     label: 'importance',
      //   },
      //   {
      //     value: '5',
      //     label: 'fatal',
      //   },
      // ],
      endTimeoptions: {
        shortcuts: [
          {
            text: 'Today',
            value () {
              return new Date();
            },
            onClick: (picker) => {
              this.$Message.info('Click today');
            }
          },
          {
            text: 'One week',
            value () {
              let date = new Date(vm.data.startTime);
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              return date;
            },
            onClick: (picker) => {
              //this.$Message.info('Click a week ago');
            }
          },
          // {
          //   text: 'One month',
          //   value () {
          //     const date = new Date(data.startTime);
          //     date.setTime(date.getTime() - 3600 * 1000 * 24);
          //     return date;
          //   },
          //   onClick: (picker) => {
          //     this.$Message.info('Click yesterday');
          //   }
          // },
        ]
      },
      workTimeOptions:[
        {
          value: 'complete',
          label: 'complete'
        },
        {
          value: 'inherit',
          label: 'inherit'
        },
        {
          value: 'customize',
          label: 'customize'
        },
      ],
      showWorkTime:false,
    };
  },
  methods: {
    timeStamp: function timeStamp(secondTime) {
      let time = parseInt(secondTime) + "秒";
      if (parseInt(secondTime) > 60) {
        let second = parseInt(secondTime) % 60;
        let min = parseInt(secondTime / 60);
        time = min + "分" + second + "秒";
        if (min > 60) {
          min = parseInt(secondTime / 60) % 60;
          let hour = parseInt(parseInt(secondTime / 60) / 60);
          time = hour + "小时" + min + "分" + second + "秒";
          if (hour > 24) {
            hour = parseInt(parseInt(secondTime / 60) / 60) % 24;
            let day = parseInt(parseInt(parseInt(secondTime / 60) / 60) / 24);
            time = day + "天" + hour + "小时" + min + "分" + second + "秒";
          }
        }
      }
      return time;
    }
  },
  watch:{
    'data.workTimeType':function (val,oldval){
      if(val=='complete')
      {
        let endtime=new Date(this.data.endTime);
        let startTime=new Date(this.data.startTime);
        this.data.workTime=(endtime-startTime)/1000;
        this.showWorkTime=false;
        console.log(this.data.workTime);}
        else if(val=='inherit')
        {
          this.data.workTime=5;
          this.showWorkTime=true;
        }
        else if(val=='customize')
        {
          this.data.workTime=15;
          this.showWorkTime=true;
        }
      },
      'data.startTime':function (val,oldval){
        let endtime=new Date(this.data.endTime);
        let startTime=new Date(this.data.startTime);
        if(( endtime-startTime)<0)
        this.data.endTime="";
      },

      'data.endTime':function (val,oldval){
        let endtime=new Date(this.data.endTime);
        let startTime=new Date(this.data.startTime);
        if(( endtime-startTime)<0)
        {
        this.data.endTime=this.data.startTime;
        this.$Message.warning('end-time must be later than start-time');
      }
      },


    },
    mounted:
    function () {
      //   let a = this.attr;
      //   setInterval(function () {
      //     Vue.set(a, "real_time", a.real_time + 1);
      //     //console.log(a.real_time);
      //   }, 1000);
    },
    components:{
      InputTag
    }
  };
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped >

  nav{ height: 42px; border: 1px red; }
  </style>
