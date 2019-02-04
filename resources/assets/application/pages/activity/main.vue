<template>
<article class="full" id='activity'>
  <Tabs class="fullheight" v-model="currentTab">
    <TabPane name="depend" label="Depend" class="showLarge">
      <activityList :id="id" :data="data" :filter="filter" />
    </TabPane>
    <!-- <TabPane v-for="(module,key) in modules" :key="key" :name="key.toLowerCase()" :label="key">
   </TabPane> -->
    <TabPane name="attribute" :disabled="id=='0'" label="Attribute">
      <attribute v-if="id!='0'" :form="data" />
    </TabPane>

    <TabPane name="mission" :disabled="id=='0'" label="Missions">
      <mission v-if="id!='0'" :data="data" />
    </TabPane>

    <TabPane name="files" :disabled="id=='0'" label="Files">
      <Files v-if="id!='0'" :data="data" />
    </TabPane>

    <TabPane name="topics" :disabled="id=='0'" label="Topics">

    </TabPane>

    <TabPane name="analysis" label="Analysis">
      <analysis :data="data" />
    </TabPane>

    <TabPane name="setting" label="Setting">
      <setting :data="data" />
    </TabPane>

    <!-- <Button @click="toEdit" size="small" slot="extra">edit</Button> -->
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
import activityList from './list';
import attribute from './attribute/viewer';
// import Attribute from './attribute/main';
import Mission from './mission/main';
// import Contact from '../../../chatroom/panel/panel';
// import cInput from '../../../chatroom/input/input';
// import Permissions from './permissions/main';
import Files from '../../components/file/file'
// import depend from '../components/depend/main';
import setting from './setting/main';
// import topics from '../../components/topics/main';
import analysis from './analysis/main';

export default {
  name: 'Activity',
  props: {
    // id: {
    //   type: String,
    //   default: '0',
    // },
    // currentTab:{
    //   type:String,
    // }
  },
  // props:{
  // },
  data() {
    return {
      filter: [],
      split: 0.5,
      id: '0',
      currentTab: "depend",
    };
  },
  computed: {
    data: function() {
      console.log("data"+this.id);
      let vm = this;
      for (let activityIndex in this.$root.activities) {
        console.log(activityIndex);
        if (this.$root.activities[activityIndex].id == vm.id) {
          return this.$root.activities[activityIndex];
        }
      }
      return {};
    },
  },
  methods: {
    toEdit() {}
  },
  watch: {
    '$route': {
      handler() {
        this.$route.query.id ? this.id = this.$route.query.id : this.id = '0';

        // this.$route.query.currentTab ? this.id = this.$route.query.currentTab : this.currentTab = "attribute";
        if(this.$route.query.currentTab ) this.currentTab = this.$route.query.currentTab ;
        if(this.$route.query.id==0)this.$route.query.currentTab="depend";
      },
      immediate: true,
    }
  },
  mounted() {

  },
  components: {
    navbar,
    activityList,
    Files,
    Mission,
    attribute,
    analysis,
    setting,
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

#activity .ivu-tabs-content {
  /* overflow:auto; */
  height: calc(100% - 36px);
}

#activity .ivu-tabs-content>div {
  /* height:  calc(100% - 36px); */
  overflow: auto;
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
