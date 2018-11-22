<template>
<!-- <div class="full"> -->
<div id="activity_list" class="full">
  <Breadcrumb class="missonListBreadcrumb">
    <BreadcrumbItem to="/">Todo</BreadcrumbItem>
    <!-- <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
       <BreadcrumbItem>Breadcrumb</BreadcrumbItem> -->
  </Breadcrumb>


  <li class="list-group-item justify-content-between" style='color:undefined;background-color:undefined;' @click="" >
    <!-- <span>&nbsp&nbsp&nbsp&nbsp</span> -->
    ..
  </li>
  <li class="list-group-item justify-content-between" style='color:undefined;background-color:undefined;' @click="create_thing" >
    <!-- <span>&nbsp&nbsp&nbsp&nbsp</span> -->
    {{$t("createNewEvent")}}
  </li>

  <draggable  class="list-group" v-model="items"  @start="drag=true" @end="drag=false">
    <slide-del
      v-for="(item, index) in  items"
      :key="index"
      ref="slipDel"
      del-text="删除"
      @slip-open=""
    >
      <div class="list-group-item justify-content-between">{{item.id}}</div>
      <div slot="del">Delete</div>
    </slide-del>

    <!-- <li class="list-group-item justify-content-between" style='color:undefined;background-color:undefined;' @click="" v-for="(item, index) in  items">
      {{item.id}}
    </li> -->
    <!-- <Button v-for="(item, index) in  items">{{item.id}}</Button> -->
    <!-- <item v-for="(item, index) in  items" v-bind:item="item" v-bind:index="index" :key="index" :mode="mode"></item> -->
  </draggable>



  <Spin size="large" fix v-if="spinShow"></Spin>
</div>

<!-- <div style="width: calc(50% - 4px); " class="inline-block fullheight">
  <div v-bar="{preventParentScroll: true,scrollThrottle: 30,}" class="full">
  <mission/>
</div>
</div>
</div>
</div> -->
</template>
<i18n>
{
  "en_US": {
    "createNewEvent":"Create New Activity"
  },
  "zh-CN": {
    "createNewEvent":"新建事件"
  }
}
</i18n>
<script>
import draggable from 'vuedraggable';
import SlideDel from '../../components/SlideDelete';

export default {
  name: 'activity_list',
  props: {

  },
  data() {
    return {
      id:0,
      items: [
        {'id':0},
        {'id':1},
        {'id':2},
        {'id':2},
      ],
      spinShow: false,
    };
  },
  methods: {
    create_thing() {
      // window.app.thing.activeThingNode = this;
      this.$router.push({
        name: 'thing_creator',
        query: {
          view: 'mission',
          lid: '0',
          mode: this.mode
        }
      });
      // console.log(window.app.thing.thing_id);
    },
    // load_thing: function () {
    //   var data = JSON.parse($.ajax({method: "get", url: "/api/thing/list/0" + this.item._id, async: false, data: {"_token": "{{csrf_token()}}"}}).responseText);
    //   console.log(data);
    //   Vue.set(this.item, 'children', data);
    // },
    load_thing() {
      let vm = this;
      this.spinShow = true;
      let url = "/api/v1/activity/"+vm.id+"/list";
      console.log(url);
      //因axios 不支持同步，选中ajax
      $.ajax({
        method: "get",
        url: url,
        async: false,
        success: function(data, textStatus, jqXHR) {
          vm.items = data;
          vm.spinShow = false;
        },
      });
    },
    refresh(id) {
      this.spinShow = true;
      this.load_thing();
      if (id) {
        for (let key in this.$children) {
          if (this.$children[key]._id == id) {
            // window.app.thing.activeThingNode=this.$children[key];
            break;
          }
        }
      }
      this.spinShow = false;
      return;
    },
  },

  mounted() {
    this.load_thing();
  },
  watch: {

  },

  components: {
    // item,
    draggable,
    SlideDel
  }
};
</script>
<style scoped>
.missonListBreadcrumb {
  padding: 4px;
  height: 36px;
  font-size: 20px;
  border-bottom: 1px solid #ccc;
}
</style>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped lang="sass">
  // @import "~bootstrap/scss/bootstrap";
  </style>
