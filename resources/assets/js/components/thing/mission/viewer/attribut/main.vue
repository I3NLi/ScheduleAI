
<template>
  <div id="Attribut">
    <Form  :label-width="80">

      <FormItem label="Father ID">
        {{data.fatherId}}
      </FormItem>

      <FormItem label="Worked Time">
        <span>{{timeStamp(data.workTimeCost+TmpWorkTimeCost)}}</span>
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
  }

},
mounted:
function () {
  this.setImportance(this.data.time.type);
  let vm=this;
  this.Timer.push(setInterval(function () {
    vm.TmpWorkTimeCost+=1;
    //console.log(a.real_time);
  }, 1000));
},
beforeDestroy:function(){
  //清除计时器
  for (let t in this.Timer){
    clearTimeout(this.Timer[t]);
  }
  this.data.workTimeCost+=this.TmpWorkTimeCost;
  this.update();
},
watch: {
  'data.time.type':'setImportance',
},
components:{
  InputTag,
  once,
  calendar,
},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >

nav{ height: 42px; border: 1px red; }
</style>
