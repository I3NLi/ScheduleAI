<template>
<div>
  <calendar-header/>

  <fullcalendar :currentDate="currentDate">
    <div slot="fc-header-right"></div>
  </fullcalendar>
</div>
</template>
<script>
import fullcalendar from "./components/vue-fullcalendar/fullCalendar";
import calendarHeader from '../header';
// import fullcalendar from 'vue-fullCalendar';
export default {
  name: 'month',
  data() {
    return {
      currentDate: new Date(),
    }
  },
  created() {

    // this.events = events
  },
  computed: {

  },
  methods: {

  },
  components: {
    fullcalendar,
    calendarHeader,
  },
  watch: {

  },
}
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->


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
