<template>
<article class="full" id='thing'>
  <!-- 左边区域 -->
  <aside class="inline-block fullheight" :class="{ active:isNavActive,noactive:!isNavActive }">
    <div v-bar="{preventParentScroll: true,scrollThrottle: 30}" class="full">
      <div id="vbarcontent">
        <navbar :data="thing_list" :active="mode" id="thing_navbar" />
      </div>
    </div>
  </aside>
  <!-- 中间区域 -->
  <section class="inline-block fullheight thing-list" :class="{ active:isListActive,noactive:!isListActive }">
    <div v-bar="{preventParentScroll: true,scrollThrottle: 30}" class="full">
      <div id="vbarcontent">
        <!-- <router-view class="view two" name="thing_list"></router-view> -->
        <conponent :is="zone[1]" :thing_list="thing_list" :mode="mode" />
      </div>
    </div>
  </section>
  <!-- 右边区域 -->
  <section class="inline-block fullheight mission" :class="{ active:isMissionActive,noactive:!isMissionActive }">
    <article v-bar="{preventParentScroll: true,scrollThrottle: 30}" class="full">
      <div id="vbarcontent">
        <router-view></router-view>
      </div>
    </article>
  </section>
</article>
</template>

<script>
import navbar from './navbar/navbar';
import missionlist from './missionlist/missionlist';
import creator from './mission/creator/main';

export default {
  name: 'thing',
  props: {
    /*
    移动模式下那个显示在最前
    可选值：[navbar,list,mission]
     */
    view: {
      type: String,
      default: 'navbar',
    },
    /*
    左侧thing导航栏选中项
    可选值：[]
     */
    mode: {
      type: String,
      default: 'todo',
    },
    /*
    中间thing选择栏 根地址
     */
    lid: {
      type: String,
      default: '0',
    },
  },
  // props:{
  // },
  data() {

    return {
      thing_list: [],
      activeThingNode:null,
      zone: [
        "navbar",
        "missionlist",
      ]
    };
  },
  computed: {
    isNavActive: function() {
      return 'navbar' == this.view;
    },
    isListActive: function() {
      return 'list' == this.view;
    },
    isMissionActive: function() {
      return 'mission' == this.view;
    },
  },
  methods: {
  },
  watch: {
  },
  mounted() {
    window.app.thing = this;
  },
  components: {
    navbar,
    missionlist,
    creator,
  },
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped lang="css">
/* 大屏幕（大桌面显示器，大于等于 1200px） */
/* @media (min-width: 1200px) {

} */

/* 中等屏幕（桌面显示器，大于等于 992px） */
/* @media (min-width:993px)and (max-width: 1200px) { */
@media only screen and (min-width:992px){
  aside{
    width:240px;
  }

  section.thing-list{
    width: calc(50% - 124px);
  }
  section.mission{
    width: calc(50% - 124px);
  }

}
/* 小屏幕（平板，大于等于 768px） */
@media only screen and (max-width: 991px) and (min-width:768px) {
  aside{
    width: 44px;
  }
  aside:hover + section.mission{
    display: none;
  }
  aside:hover + section.thing-list{
    width: calc(100% - 244px);
  }
  aside:hover{
    width:240px;
  }

  section.thing-list{
    width: calc(50% - 26px);
  }
  section.mission{
    width: calc(50% - 26px);
  }
}

/* 超小屏幕（手机，小于 768px） */
@media only screen and (max-width: 767px) {
  aside,section{
    width: 100%;
  }
  .noactive{
    display: none;
  }
  .active{
    width: 100%;
  }
}
/* 没有任何媒体查询相关的代码，因为这在 Bootstrap 中是默认的（还记得 Bootstrap 是移动设备优先的吗？） */
/* @media (max-width:767) {

} */




</style>
<style>
/* 小屏幕（平板，大于等于 768px） */
@media only screen and (max-width: 991px) and (min-width:768px) {
  aside .ivu-menu-item-group-title{
    padding-left: 4px !important;
  }
  aside .ivu-menu-item{
    padding-left: 16px !important;
  }
  aside .option-name{
    display: none;
  }
  aside .ivu-menu-submenu-title{
    padding-left: 0px !important;
    padding-right: 0px !important;
    text-align: center;
  }
  /* aside .ivu-menu-submenu-title>.ivu-icon.ivu-icon-ios-arrow-down.ivu-menu-submenu-title-icon{
    padding-left: 8px !important;
  } */

  aside:hover .ivu-menu-item-group-title{
    padding-left: 28px !important;
  }
  aside:hover .ivu-menu-item{
    padding: 14px 24px !important;
  }
  aside:hover .option-name{
    display: inline;
  }
  aside:hover .ivu-menu-submenu-title{
    padding:14px 24px !important;
    text-align: left;
  }
}


</style>

<style scoped lang="less">
// /* 超小屏幕（手机，小于 768px） */
// /* 没有任何媒体查询相关的代码，因为这在 Bootstrap 中是默认的（还记得 Bootstrap 是移动设备优先的吗？） */
//
// /* 小屏幕（平板，大于等于 768px） */
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
