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
  <div id="Attribut">
    <Form  :label-width="80">
      <FormItem label="Used Time">
        {{timeStamp(data.planTimeCost)}}
      </Select>
      </FormItem>
    <FormItem label="Repeat">
      <Select v-model="data.time.type">
        <Option
        v-for="timetype in timetypes"
        :value="timetype.value"
        :key="timetype.value"
        :disabled="timetype.disabled"
        placeholder="Repeat"
        filterable
        >
        {{ timetype.label }}
      </Option>
    </Select>
    </FormItem>

  <component :is="data.time.type" id="time" :data="data.time.data"/>

    <FormItem label="importance">
      <Select v-model="data.importance">
        <Option
        v-for="importance in importances"
        :value="importance.value"
        :key="importance.value"
        placeholder="importance"
        filterable>
        {{ importance.label }}
      </Option>
    </Select>
    </FormItem>

  <FormItem label="tags">
    <input-tag :tags="data.tags"/>
  </FormItem>
<!-- <input-tag :on-change="callbackMethod" :tags="tagsArray"></input-tag> -->

  </Form>

  <!-- 撑大框体以显示所有select的子选项 -->
  <br/>
  <br/>
  <br/>
  
</br/>


</div>
</template>

<script>
import once from './timeComponent/once';
import day from './timeComponent/day';
import month from './timeComponent/month';
import week from './timeComponent/week';
import year from './timeComponent/year';
import calendar from './timeComponent/calendar';

// import config from '@/config';
import InputTag from 'vue-input-tag'

export default {
  name: 'attr',
  props: {
    data:Object,
    /*
    data{
    time{
    type:once
    data:
  },
  importance
  tags
}
*/
},
data() {
  return {
    timetypes:[
      {
        value: 'once',
        label: 'once'
      },
      {
        value: 'day',
        label: 'per day'
      },
      {
        value: 'week',
        label: 'per week'
      },
      {
        value: 'month',
        label: 'per month',
        disabled:true,
      },
      {
        value: 'year',
        label: 'per year',
        disabled:true,
      },
      {
        value: 'calendar',
        label: 'calendar',
        disabled:true,
      },

    ],
    importances:[
      {
        value: '1',
        label: 'Insignificant',
      },
      {
        value: '2',
        label: 'unimportant',
      },
      {
        value: '3',
        label: 'normal'
      },
      {
        value: '4',
        label: 'importance',
      },
      {
        value: '5',
        label: 'fatal',
      },
      // {
      //   value: '6',
      //   label: 'fatal',
      // },
      // {
      //   value: '7',
      //   label: 'fatal',
      // },
    ],
  };
},
methods: {
  timeStamp(secondTime) {
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
  },
  setImportance(val){
    if(val=='once'){
      this.data.importance="3";
    }else{
      this.data.importance="2";
    }
  }
},
mounted:
function () {
  this.setImportance(this.data.time.type);
    let vm=this;
    setInterval(function () {
      vm.data.planTimeCost+=1;
      //console.log(a.real_time);
    }, 1000);
},
watch: {
  'data.time.type':'setImportance',
},
components:{
  InputTag,
  once,
  day,
  week,
  month,
  year,
  calendar,
},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >

nav{ height: 42px; border: 1px red; }
</style>
