<template>
  <div  id='day'>
    <aside class="inline-block fullheight">
      <div v-bar="{
        preventParentScroll: true,
        scrollThrottle: 30,
        }" class="full">
        <div class="v-bar-container">
          <calendar-header/>
          <daybody class="full"/>
        </div>
      </div>
    </aside>

    <section  class="inline-block fullheight">
      <div v-bar="{preventParentScroll: true,scrollThrottle: 30}" class="full">
        <div id="vbarcontent">
          <!-- <router-view></router-view> -->
          <mission :id="tid"/>
        </div>
      </div>
    </section>

    </div>
  </template>

  <script>
  import daybody from './components/body';
  import calendarHeader from '../header';
  import mission from "../../thing/mission/viewer/main"

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
      mission,
    },

  };
  </script>

  <!-- Add "scoped" Attribute to limit CSS to this component only -->
  <style scoped>
  /* .link{
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
  } */


  /* 大屏幕（大桌面显示器，大于等于 1200px） */
  /* @media (min-width: 1200px) {

  } */

  /* 中等屏幕（桌面显示器，大于等于 992px） */
  /* @media (min-width:993px)and (max-width: 1200px) { */
  @media (min-width:992px){
    aside{
      width:calc(100% - 604px);
    }

    section{
      width: 600px;
    }


  }
  /* 小屏幕（平板，大于等于 768px） */
  @media (max-width: 991px)  {
    aside{
      width: 100%;
    }

    section{
      width: 100%;
    }

    .noactive{
      display: none;
    }

    .active{
      width: 100%;
    }
  }

  /* 超小屏幕（手机，小于 768px） */
  /* @media (max-width: 767px) {

  } */
  /* 没有任何媒体查询相关的代码，因为这在 Bootstrap 中是默认的（还记得 Bootstrap 是移动设备优先的吗？） */
  /* @media (max-width:767) {

  } */
  </style>
