<template>
    <aside class="inline-block fullheight">
      <calendar-header/>
      <daybody class="daybody" />
    </aside>
  </template>

  <script>
  import daybody from './components/body';
  import calendarHeader from '../header';
  // import mission from "../../thing/mission/viewer/main"

  export default {
    name: 'day',
    props:{
      view:{
        //表示哪一个视图浮在最上层
        type:String,
        dafault:'calendar',
      },
      tid:{
        type:String,
        // default:"xxx",
      }
    },
    data() {
      return {
        OpenMission:false,
      };
    },
    computed:{
      isCalendarActive: function() {
        return 'calendar' == this.view;
      },
      isMissionActive: function() {
        return 'mission' == this.view;
      },
    },
    components:{
      calendarHeader,
      daybody,
      // mission,
    },

  };
  </script>

  <!-- Add "scoped" Attribute to limit CSS to this component only -->
  <style scoped>

  </style>
