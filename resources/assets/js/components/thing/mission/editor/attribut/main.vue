<template>
  <div id="Attribut">
    <Form  :label-width="80">
      <FormItem label="Worked Time">
        <span>{{timeStamp(data.workTimeCost+TmpWorkTimeCost)}}</span>
        <span >
          <Button
          size="small"
          @click="reset_workTimeCost"
          >
          Reset
        </Button>
      </span>
    </FormItem>

    <FormItem label="Used Time">
      {{timeStamp(data.planTimeCost+TmpPlanTimeCost)}}

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

<Button
type="success"
long
@click="create()"
v-show="data.time.type!='once'">
SUBMIT
</Button>
<br/>
<br/>

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
    editor:Object,
    //fulldata:Object,
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
    TmpPlanTimeCost:0,
    TmpWorkTimeCost:0,
    Timer:[],
  };
},
methods: {
  timeStamp(secondTime){
    return window.timeStamp(secondTime);
  },
  setImportance(val){
    if(val=='once'){
      this.data.importance="3";
    }else{
      this.data.importance="2";
    }
  },
  /*发起修改*/
  update(message=false){
    let modules=["Attribut"];
    this.editor.update(modules,false,message);
  },
  reset_workTimeCost(){
    this.data.workTimeCost=0;
  },
  create(){}
},
mounted:function () {
  this.setImportance(this.data.time.type);
  let vm=this;
  this.Timer.push(
    setInterval(
      function () {
        vm.TmpPlanTimeCost+=1;
        //console.log(a.real_time);
      },
      1000)
    );
  },
  beforeDestroy:function(){
    //清除计时器
    for (let t in this.Timer){
      clearTimeout(this.Timer[t]);
    }
    this.data.planTimeCost+=this.TmpPlanTimeCost;
    this.update();
  },
  watch: {
    'data.time.type':'setImportance',
    'data':{
      handler: function (val, oldVal){
        let modules=["Attribut"];
        console.log(val);
        this.editor.update(modules,false,true);
      },
      deep: true
    },
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
