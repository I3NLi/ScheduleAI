<template>
  <div  id='day'>
    <div style="width:calc(100% - 604px);" class="inline-block fullheight">
      <div v-bar="{
        preventParentScroll: true,
        scrollThrottle: 30,
        }" class="full">
        <div class="v-bar-container">
          <calendar-header/>
          <daybody class="full"/>
        </div>
      </div>
    </div>

    <div style="width:600px" class="inline-block fullheight">
      <div v-bar="{preventParentScroll: true,scrollThrottle: 30}" class="full">
        <div id="vbarcontent">
          <router-view></router-view>
        </div>
      </div>
    </div>

      <!-- <div style="width: 400px;" class="inline-block fullheight">
        <div v-bar="{
          preventParentScroll: true,
          scrollThrottle: 30,
          }" class="full">
          <div class="v-bar-container">
            <mission/>
          </div>
        </div>
      </div>-->
    </div>
  </template>

  <script>
  import daybody from './components/body';
  import calendarHeader from '../header';

  export default {
    name: 'day',
    props:{
      view:{
        //表示哪一个视图浮在最上层
        type:String,
        dafault:'calendar',
      },
    },
    data() {
      return {
        OpenMission:false,
      };
    },
    components:{
      calendarHeader,
      daybody,
    }
  };
  </script>

  <!-- Add "scoped" Attribute to limit CSS to this component only -->
  <style scoped>
  .link{
    width:calc(100% - 204px);
  }
  .right{
    width:200px;
    height: 100%;
  }
  .header{
    width: 100%;
    height: 52px !important;
    background: blue;
  }
  </style>
