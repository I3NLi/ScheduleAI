<template>
<!-- <div class="full"> -->
<div id="thing_list" class="full">
  <Breadcrumb class="missonListBreadcrumb">
    <BreadcrumbItem to="/">Todo</BreadcrumbItem>
    <!-- <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
       <BreadcrumbItem>Breadcrumb</BreadcrumbItem> -->
  </Breadcrumb>

  <li class="list-group-item justify-content-between" style='color:undefined;background-color:undefined;'  @click="create_thing">
    <span>{{$t("createNewEvent")}}</span>
  </li>

  <draggable v-model="myArray" :options="{group:'people'}" @start="drag=true" @end="drag=false">
    <li  class="list-group-item" v-for="element in myArray" :key="element.id">

      <!-- <span>#{{item._id.substr(-4,4)}}&nbsp&nbsp</span> -->
      <!-- {{item.Attribute.title}} -->
      {{element.name}}
      <span style="float:right" class="badge badge-default badge-pill" >3</span>
    </li>
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
    "createNewEvent":"Create New Event"
  },
  "zh-CN": {
    "createNewEvent":"新建事件"
  }
}
</i18n>
<script>
import draggable from 'vuedraggable';
import item from './item';
//
// require('malihu-custom-scrollbar-plugin');

//根据thing中的fid，组成嵌套关系
function buildlist(list) {
  // console.log(list);
  for (let m = 0; m < list.length; m++) {
    for (let n = 0; n < list.length; n++) {
      if (list[n] != null && list[m] != null) {
        let tmp = find_position(list[m], list[n]);
        if (tmp != false) {
          list[n] = tmp;
          list[m] = null;
          break;
        }
      }
    }
  }
  // console.log("list:");
  // console.log(list);
  let result = [];
  for (let m = 0; m < list.length; m++) {
    if (list[m] != null) {
      result.push(list[m]);
    }
  }
  addOrder(result);
  console.log(result);
  return result;
}

/*buildlist 递归部分*/
function find_position(thing, thingtree) {
  // console.log("thingtree");
  // console.log(thingtree);
  if (thingtree._id == thing.Attribute.fatherId) {
    // console.log("has father");
    if (thingtree.children != undefined) {
      // console.log("child exist");
      thingtree.children.push(thing);
      //console.log(thingtree.children);
    } else {
      // console.log("child no exist");
      thingtree.children = [thing];
    }
    return thingtree;
  }
  // console.log("no father in root");

  if (thingtree.children != undefined) {
    // console.log("child exist");
    for (let i = 0; i < thingtree.children.length; i++) {
      let tmp = find_position(thing, thingtree.children[i]);
      if (tmp != false) {
        thingtree.children[i] = tmp;
        // console.log("find father in child");
        return thingtree;
      }
    }
    // console.log("no father in child");
  }
  // console.log("child not exist");
  return false;
}

function addOrder(list){
  for(let index in list){
    list[index].order=index
    if (list[index].children!= undefined){
      addOrder(list[index].children);
    }
  }
  return true;
}
export default {
  name: 'missionlist',
  props: {
    // thing_list:Array,
    mode: {
      type: String,
      default: "todo"
    },
  },
  data() {
    return {
      items: [],
      layer: -1,
      isExist: true,
      spinShow: true,
      myArray: [{
          "name": "component",
          "order": 3,
          "fixed": false
        },
        {
          "name": "draggable",
          "order": 2,
          "fixed": false
        },
        {
          "name": "vue.draggable",
          "order": 1,
          "fixed": false
        },
        {
          "name": "for",
          "order": 4,
          "fixed": false
        },
        {
          "name": "vue.js 2.0",
          "order": 5,
          "fixed": false
        },
        {
          "name": "based",
          "order": 6,
          "fixed": false
        },
        {
          "name": "on",
          "order": 7,
          "fixed": false
        },
        {
          "name": "Sortablejs",
          "order": 8,
          "fixed": false
        }
      ],
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
      let $vm = this;
      this.spinShow = true;
      let url = "/api/thing/list/" + this.mode.toLocaleLowerCase();
      console.log(url);
      //因axios 不支持同步，选中ajax
      $.ajax({
        method: "get",
        url: url,
        async: false,
        success: function(data, textStatus, jqXHR) {
          $vm.items = buildlist(data);
          $vm.spinShow = false;
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
    // this.create_thing();//绑定生成器到取当前节点
  },
  watch: {
    mode: function(newVal) {
      this.load_thing();
    }
  },

  components: {
    item,
    draggable,
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
