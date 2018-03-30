<template>
  <fullcalendar :currentDate ="currentDate">
    <div slot="fc-header-right"></div>
  </fullcalendar>
</template>
<script>
import fullcalendar from "./components/vue-fullcalendar/fullCalendar";

// import fullcalendar from 'vue-fullCalendar';
export default {
  data () {
    return {
      currentDate :new Date(),
    }
  },
  created () {

    // this.events = events
  },
  computed : {

  },
  methods: {
    
  },
  components:{
    fullcalendar,
  },
  watch:{

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->


<style scoped>

table{
  width: 100%;
  height: 52px;
  /*border: 1px solid;*/
  background: #bbb;
}
tr{
  text-align: center;
}
td{
  /*width: 33.3%;*/
}
.left{text-align: left;}
.center{}
  .content{height:calc(100% - 104px);}
  </style>

  <style >
  .ivu-scroll-container,.fullheight{
    height:100% !important;
  }
  </style>
