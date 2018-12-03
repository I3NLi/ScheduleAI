<template>
<article class="full" id='activity'>
  <!-- 左边区域 -->
  <aside class="inline-block fullheight">
    <!-- <div v-bar="{preventParentScroll: true,scrollThrottle: 30}" class="full"> -->
    <!-- <div id="vbarcontent"> -->
    <navbar :filter="filter" />
    <!-- </div> -->
    <!-- </div> -->
  </aside>
  <section class="ActivitySplit inline-block fullheight">
    <Split v-model="split" min="200" max="200">
      <article slot="left" class="">
        <missionlist :id="id" :filter="filter" />
      </article>
      <article slot="right" class="">
        <Tabs class="fullheight">
          <!-- <TabPane name="depend" label="depend" class="showLarge">
            <missionlist :id="id" :filter="filter" />
          </TabPane> -->

          <!-- <TabPane v-for="(module,key) in modules" :key="key" :name="key.toLowerCase()" :label="key">

          </TabPane> -->
          <TabPane name="mission" label="mission">

          </TabPane>
          <TabPane name="files" label="Files">
            <Files/>
          </TabPane>

          <TabPane name="topics" label="topics">

          </TabPane>

          <TabPane name="analysis" label="analysis">

          </TabPane>

          <TabPane name="setting" label="setting">

          </TabPane>

          <Button @click="toEdit" size="small" slot="extra">edit</Button>
        </Tabs>
        <hr />

        <!-- <contact slot="content" :data="data.Contact" :permissions="modules.Permissions" /> -->

        <div class='c_input'>
          <!-- <c-input :data='this.data.Contact' :ziel='ziel' /> -->
        </div>
      </article>
    </Split>
  </section>
  <!-- <section class="inline-block fullheight activity-list" :class="{ active:isListActive,noactive:!isListActive }">
     <div v-bar="{preventParentScroll: true,scrollThrottle: 30}" class="full">
       <div id="vbarcontent">
         <router-view class="view two" name="activity_list"></router-view>
        <missionlist :id="id" :filter="filter"/>
      </div>
   </div>
  </section>
  < 右边区域
  <section class="inline-block fullheight mission" :class="{ active:isMissionActive,noactive:!isMissionActive }">
    <article v-bar="{preventParentScroll: true,scrollThrottle: 30}" class="full">

    </article>
  </section> -->
</article>
</template>

<script>
import navbar from './navbar/navbar';
import missionlist from './list';
// import creator from './mission/creator/main';
// import Attribute from './attribute/main';
import Mission from './missionComponent/FormViewer/FormViewer';
// import Contact from '../../../chatroom/panel/panel';
// import cInput from '../../../chatroom/input/input';
// import Permissions from './permissions/main';
import Files from '../../components/file/file'
// import depend from '../components/depend/main';
// import setting from '../components/setting/main';
// import topics from '../../components/topics/main';
// import analysics from '../analysics/main';

export default {
  name: 'Activity',
  props: {
    id: {
      type: String,
      default: '0',
    },
  },
  // props:{
  // },
  data() {
    return {
      filter: [],
      split: 0.5,
    };
  },
  computed: {

  },
  methods: {
    toEdit(){}
  },
  watch: {},
  mounted() {

  },
  components: {
    navbar,
    missionlist,
    Files,
    Mission,
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
  section.ActivitySplit{
    width: calc(100% - 246px);
  }
  section.activity-list{
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
  section.ActivitySplit{
    width: calc(100% - 50px);
  }
  aside:hover + section.mission{
    display: none;
  }
  aside:hover + section.activity-list{
    width: calc(100% - 244px);
  }
  aside:hover{
    width:240px;
  }
  section.activity-list{
    width: calc(50% - 26px);
  }
  section.mission{
    width: calc(50% - 26px);
  }
  .showLarge{
    display: none;
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
  .showLarge{
    display: none;
  }
}
/* 没有任何媒体查询相关的代码，因为这在 Bootstrap 中是默认的（还记得 Bootstrap 是移动设备优先的吗？） */
/* @media (max-width:767) {

} */




</style>
<style>
#activity .ivu-tabs-nav-right{
  margin-top: 8px;
}
#activity .ivu-tabs-tabpane{
  padding-left: 8px;
}
#active .ivu-tabs-bar{
  margin-bottom: 0px;
}
/* 小屏幕（平板，大于等于 768px） */
@media only screen and (max-width: 991px) and (min-width:768px) {
  body {
    /* background: #495060; */
  }

  aside .ivu-menu-item-group-title {
    padding-left: 4px !important;
  }

  aside .ivu-menu-item {
    padding-left: 16px !important;
  }

  aside .option-name {
    display: none;
  }

  aside .ivu-menu-submenu {
    display: none;
    /* padding-left: 0px !important;

    padding-right: 0px !important; */
    /* text-align: center; */
  }

  /* aside li.ivu-menu-submenu.ivu-menu-item-active.ivu-menu-child-item-active.ivu-menu{
    display: none;
  } */
  /* ivu-icon ivu-icon-ios-arrow-down ivu-menu-submenu-title-icon */
  /* aside .ivu-menu-submenu-title>.ivu-icon.ivu-icon-ios-arrow-down.ivu-menu-submenu-title-icon{
    padding-left: 8px !important;
  } */

  aside:hover .ivu-menu-item-group-title {
    padding-left: 28px !important;
  }

  aside:hover .ivu-menu-item {
    padding: 14px 24px !important;
  }

  aside:hover .option-name {
    display: inline;
  }

  aside:hover .ivu-menu-submenu {
    display: block;
    /* padding:14px 24px !important;
    text-align: left; */
  }
}
</style>
<style>
/* #activity_navbar>ivu-menu-submenu{
  display: none;
} */
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
