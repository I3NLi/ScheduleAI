<template>
  <div>

    <FormItem label="Start Time" v-show="data.startCondition=='datetime'">
      <!-- <DatePicker v-model="data.startTime" type="datetime" placeholder="Select date" ></DatePicker> -->
      {{data.startTime}}
    </FormItem>

    <FormItem label="End Time">
      <!-- <DatePicker v-model="data.endTime" :options="endTimeoptions" type="datetime" placeholder="Select date" ></DatePicker> -->
      {{data.endTime}}
    </FormItem>
    <FormItem label="Work Time">
      {{data.workTime}}
    </FormItem>
    <FormItem label="Remaining time">
      <!-- <DatePicker v-model="data.endTime" :options="endTimeoptions" type="datetime" placeholder="Select date" ></DatePicker> -->
      {{timeStamp(RemainingTime)}}
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
      RemainingTime:((new Date(this.data.endTime)-new Date())/1000),
    }

  },
  methods: {
    timeStamp(secondTime){
      return window.timeStamp(secondTime);
    },
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
    mounted:function () {
      // let a = this;

      // setInterval(function () {
      //   Vue.set(a, "RemainingTime", a.RemainingTime - 1);
      //   //console.log(a.real_time);
      // }, 1000);
      let vm=this;
      setInterval(function () {
        vm.RemainingTime-=1;
        //console.log(a.real_time);
      }, 1000);
    },
    computed:{
      // RemainingTime(){
      //   return this.timeStamp((new Date(this.data.endTime)-new Date())/1000);
      // }
    },
    components:{
      InputTag
    }
  };
  </script>

  <!-- Add "scoped" Attribute to limit CSS to this component only -->
  <style scoped >

  nav{ height: 42px; border: 1px red; }
  </style>
