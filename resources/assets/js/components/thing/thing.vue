<template>
  <div class="full" id='thing'>
    <div style="width:240px;" class="inline-block fullheight">
      <div v-bar="{preventParentScroll: true,scrollThrottle: 30}" class="full">
        <div id="vbarcontent">
          <navbar :data="thing_list"/>
        </div>
      </div>
    </div>
    <div style="width: calc(50% - 124px);" class="inline-block fullheight">
      <div v-bar="{preventParentScroll: true,scrollThrottle: 30}" class="full">
        <div id="vbarcontent">
          <missionlist :thing_list="thing_list"/>
        </div>
      </div>
    </div>
    <div style="width: calc(50% - 124px);" class="inline-block fullheight">
      <div v-bar="{preventParentScroll: true,scrollThrottle: 30}" class="full">
        <div id="vbarcontent">
          <mission :id='thing_id' v-if="current_mission" :mode="currentView"/>
          <creator :id='thing_id' v-if="current_creator"/>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import navbar from './navbar/navbar';
import missionlist from './missionlist/missionlist';
import mission from './mission/mission';
import creator from './mission/creator/main';

export default {
  name: 'thing',
  // props:{
  // },
  data() {
    return {
      missionlist_filter: 0,
      // mission_id: 0,
      thing_list:[],
      thing_id:0,
      // activeThingNode:null,
      currentView:'creator',

    };
  },
  computed: {
    id(){
      // window.app.activeThing = "this"
      if(window.app.activeThing == undefined ){
        // console.log("undefined");
        return 0;
      }else{
        // console.log("hello");
        // console.log(window.app.activeThing.thing_id);
        return window.app.activeThing.thing_id;

      }

    },
    current_mission(){
      return this.currentView=='editor'||this.currentView=='viewer';
    },
    current_creator(){
      return this.currentView=='creator';
    }

  },
  methods: {
    set_mode(id,mode){
      this.thing_id=id;
      this.currentView='';
      this.$nextTick(
        function init() {
          this.currentView=mode;
        },
      );
    },

    set_creator(id){
      this.set_mode(id,"creator");
    },
  },
  watch:{
    'id':function (){
      if(this.current_mission){
        let tmp=this.currentView;
        this.currentView='';
        this.$nextTick(
          function init() {
          this.currentView='mission';
          }
        );
      }
    }
  },
  mounted() {
    window.app.thing=this;
    this.$nextTick(
      function init() {

        // return $('#thing_list').mCustomScrollbar({ theme: 'light-2' });
        // Code that will run only after the
        // entire view has been rendered
      },
    );
  },
  components: {
    navbar,
    missionlist,
    mission,
    creator,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
/* 超小屏幕（手机，小于 768px） */
/* 没有任何媒体查询相关的代码，因为这在 Bootstrap 中是默认的（还记得 Bootstrap 是移动设备优先的吗？） */

/* 小屏幕（平板，大于等于 768px） */
// @media (min-width: @screen-sm-min) {
//
// }
//
// /* 中等屏幕（桌面显示器，大于等于 992px） */
// @media (min-width: @screen-md-min) {
//
// }
//
// /* 大屏幕（大桌面显示器，大于等于 1200px） */
// @media (min-width: @screen-lg-min) {
//
// }
</style>
