<template>
<!-- <div class="full"> -->
<div id="activity_list" class="full">
  <!-- <Breadcrumb class="missonListBreadcrumb">
    <BreadcrumbItem to="/">Todo</BreadcrumbItem>
    <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
       <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
  </Breadcrumb> -->

  <!-- <mu-sub-header>Today</mu-sub-header> -->
  <li class="list-group-item justify-content-between" style='color:undefined;background-color:undefined;' @click="openParent()" v-if="id!=0">
    <!-- <span>&nbsp&nbsp&nbsp&nbsp</span> -->
    ..
  </li>
  <li class="list-group-item justify-content-between" style='color:undefined;background-color:undefined;' @click="create_activity">
    <!-- <span>&nbsp&nbsp&nbsp&nbsp</span> -->
    {{$t("createNewEvent")}}
  </li>
  <mu-sub-header>Include</mu-sub-header>
  <draggable class="list-group" v-model="items" @start="drag=true" @end="drag=false" :options="draggableOptions">
    <slide-del @click.native="openActivity(item.id)" v-for="(item, index) in  items" :key="index" ref="slipDel" del-text="" @slip-open="" @del-click="" delCls="ivu-btn-success">
      <div class="list-group-item justify-content-between">
        {{(item.id+"").substr(-4)}}
        <Divider type="vertical" />
        {{item.name}}
        <span></span>
        <!-- <Tag checkable color="primary">{{item.until_at}}</Tag> -->
      </div>
      <span slot="del" @click.stop="complateActivity(item)">complete</span>
    </slide-del>
    <mu-sub-header>Extends</mu-sub-header>
    <!-- <li class="list-group-item justify-content-between" style='color:undefined;background-color:undefined;' @click="" v-for="(item, index) in  items">
      {{item.id}}
    </li> -->
    <!-- <Button v-for="(item, index) in  items">{{item.id}}</Button> -->
    <!-- <item v-for="(item, index) in  items" v-bind:item="item" v-bind:index="index" :key="index" :mode="mode"></item> -->
  </draggable>

  <Spin size="large" fix v-if="$root.spinShow"></Spin>
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
    'id': {
      type: [String],
      default: '0'
    },
    'data': {
      type: Object,
    }
  },
  data() {
    return {
      items: [],
      spinShow: false,
      draggableOptions: {
        delay: 300,
        ghostClass: 'ghost',  //原始占位样式
        dragClass: "drag",  //跟随鼠标样式
        chosenClass:"chosen"  //目标占位样式
      }
    };
  },
  methods: {
    complateActivity(activity) {
      activity.complete_at = new Date();
      console.log(this.$refs.slipDel);
      this.$updateActivity(activity);
      //关闭所有
      this.$refs.slipDel.forEach(
        function(item) {
          item.setOpen(false);
        });
      console.log(activity);
    },
    openParent() {
      let vm = this;
      console.log(vm.data.parent_id);
      this.$router.push({
        path: '/activity',
        query: {
          'id': vm.data.parent_id + "",
        }
      });
    },
    openActivity(id) {
      this.$router.push({
        path: '/activity',
        query: {
          'id': id + "",
          'currentTab': "depend"
        }
      });
    },
    create_activity() {
      // window.app.activity.activeThingNode = this;
      let vm = this;
      this.$router.push({
        name: 'Activity: new',
        query: {
          'id': vm.data.id + "",
          // 'currentTab':"depend"
        }
        // query: {
        //   view: 'mission',
        //   lid: '0',
        //   mode: this.mode
        // }
      });
      // console.log(window.app.activity.activity_id);
    },
    // load_activity: function () {
    //   var data = JSON.parse($.ajax({method: "get", url: "/api/activity/list/0" + this.item._id, async: false, data: {"_token": "{{csrf_token()}}"}}).responseText);
    //   console.log(data);
    //   Vue.set(this.item, 'children', data);
    // },
    // load_activity() {
    //   let vm = this;
    //   this.spinShow = true;
    //   let url = "/api/v1/activity/" + vm.id + "/list";
    //   console.log(url);
    //   //因axios 不支持同步，选中ajax
    //   $.ajax({
    //     method: "get",
    //     url: url,
    //     async: true,
    //     success: function(data, textStatus, jqXHR) {
    //       vm.items = data;
    //       vm.spinShow = false;
    //       console.log(vm.items);
    //     },
    //   });
    // },
    // refresh(id) {
    //   this.spinShow = true;
    //   this.load_activity();
    //   if (id) {
    //     for (let key in this.$children) {
    //       if (this.$children[key]._id == id) {
    //         // window.app.activity.activeThingNode=this.$children[key];
    //         break;
    //       }
    //     }
    //   }
    //   this.spinShow = false;
    //   return;
    // },
    freshItems() {
      console.log("freshItems");
      console.log(this.$root.activities);
      let result = [];
      let vm = this;
      this.$root.activities.forEach(function(activity) {
        if ((activity.parent_id == vm.id) && (activity.complete_at == null)) {
          result.push(activity);
        }
      });
      this.items = result;
    }
  },
  computed: {
    // items: function() {
    //   return result;
    // },
  },
  watch: {
    "$root.activities": {
      handler(newVal) {
        this.freshItems();
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    // this.freshItems();
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

#activity_list .list-group-item {
  border: 0px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 0px;
}

#activity_list {
  /* overflow:auto; */
}

</style>
<style>
.ghost {

}

.chosen{
  opacity: .7;
  /* color:  #C8EBFB; */
  /* background: #C8EBFB; */
  /* background-color: #c00; */
}
.chosen .list-group-item{
  /* color:  #C8EBFB; */
  background: #C8EBFB;
  /* background-color: #c00; */
}
.drag{
  opacity: .0;
  display: none;
}
</style>
<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped lang="sass">
  // @import "~bootstrap/scss/bootstrap";
  </style>
