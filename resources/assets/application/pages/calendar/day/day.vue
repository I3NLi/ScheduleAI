<template>
    <article class="inline-block fullheight">
      <calendar-header/>
      <daybody class="daybody" />
      <Button size="large" shape="circle" icon="md-add" class="newButton" @click="create_activity"></Button>
    </article>
  </template>

  <script>
  import daybody from './components/body';
  import calendarHeader from '../header';
  // import mission from "../../activity/mission/viewer/main"

  export default {
    name: 'day',
    props:{

    },
    data() {
      return {
        OpenMission:false,
      };
    },
    methods:{
      create_activity() {
        // window.app.activity.activeThingNode = this;
        this.$router.push({
          name: 'Activity: new',
          query: {
            view: 'mission',
            lid: '0',
            mode: this.mode
          }
        });
        // console.log(window.app.activity.activity_id);
      },
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
.newButton{
  position: absolute;
right: 40px;
top: 80vh;
opacity:0.6;
}
.newButton:hover{
opacity:1;
}
.daybody{
  height: calc(100% - 24px);
}
  </style>
