<template>
<article class="full" id='activity'>
  <Tabs class="fullheight">
    <TabPane name="depend" label="depend" class="showLarge">
      <missionlist :id="id" :filter="filter" />
    </TabPane>
    <!-- <TabPane v-for="(module,key) in modules" :key="key" :name="key.toLowerCase()" :label="key">
   </TabPane> -->
   <TabPane name="attribute" label="Attribute">
     <attribute />
   </TabPane>

    <TabPane name="mission" label="Mission">

    </TabPane>
    <TabPane name="files" label="Files">
      <Files />
    </TabPane>

    <TabPane name="topics" label="topics">

    </TabPane>

    <TabPane name="analysis" label="analysis">
      <analysis />
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
</template>

<script>
import navbar from './navbar/navbar';
import missionlist from './list';
import attribute from './attribute/viewer';
// import Attribute from './attribute/main';
import Mission from './missionComponent/FormViewer/FormViewer';
// import Contact from '../../../chatroom/panel/panel';
// import cInput from '../../../chatroom/input/input';
// import Permissions from './permissions/main';
import Files from '../../components/file/file'
// import depend from '../components/depend/main';
// import setting from '../components/setting/main';
// import topics from '../../components/topics/main';
import analysis from './analysis/main';

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
    toEdit() {}
  },
  watch: {},
  mounted() {

  },
  components: {
    navbar,
    missionlist,
    Files,
    Mission,
    attribute,
    analysis,
  },
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped lang="css">

</style>

<style>
#activity .ivu-tabs-nav-right {
  margin-top: 8px;
}

/* #activity .ivu-tabs-tabpane {
  padding-left: 8px;
} */

#activity .ivu-tabs-bar {
  margin-bottom: 0px;
}
#activity .ivu-tabs-content{
  /* overflow:auto; */
  height:  calc(100% - 36px);
}
#activity .ivu-tabs-content>div{
  /* height:  calc(100% - 36px); */
  overflow:auto;
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
