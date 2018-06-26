<template>
  <!-- <div class="full"> -->
  <div id="thing_list"  class="full">
    <ul class="list-group" id="things" v-if="isExist">
      <item v-for="(item, index) in  items"
      v-bind:item="item"
      v-bind:index="index"
      :key="index"
      :mode="mode"
      ></item>
      <!--<li class="list-group-item " style='color:undefined;background-color:undefined;' v-for="(item, index) in  items">@{{index}}+@{{item.titel}}</li>   -->
      <li class="list-group-item justify-content-between" style='color:undefined;background-color:undefined;' @click="create_thing" v-if="(mode.toLocaleLowerCase()!='invited')&&(mode.toLocaleLowerCase()!='deleted')">
        <!-- <span>&nbsp&nbsp&nbsp&nbsp</span> -->
        <span>新建事件++++</span>
      </li>
    </ul>
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

<script>
import mission from '../mission/mission';
import item from './item';
//
// require('malihu-custom-scrollbar-plugin');

//根据thing中的fid，组成嵌套关系
function buildlist(list){
  // console.log(list);
  for(let m=0; m<list.length; m++){
    for(let n=0; n<list.length; n++){
      if(list[n]!=null&&list[m]!=null){
        let tmp=find_position(list[m],list[n]);
        if(tmp!=false){
          list[n]=tmp;
          list[m]=null;
          break;
        }
      }
    }
  }
  // console.log("list:");
  // console.log(list);
  let result=[];
  for(let m=0;m<list.length;m++){
    if(list[m]!=null){
      result.push(list[m]);
    }
  }
  // console.log(result);
  return result;
}

/*buildlist 递归部分*/
function find_position(thing,thingtree){
  // console.log("thingtree");
  // console.log(thingtree);
  if(thingtree._id==thing.Attribute.fatherId){
    // console.log("has father");
    if(thingtree.children!=undefined){
      // console.log("child exist");
      thingtree.children.push(thing);
      //console.log(thingtree.children);
    }else{
      // console.log("child no exist");
      thingtree.children=[thing];
    }
    return thingtree;
  }
  // console.log("no father in root");

  if(thingtree.children!=undefined){
    // console.log("child exist");
    for(let i=0;i<thingtree.children.length;i++){
      let tmp=find_position(thing,thingtree.children[i]);
      if(tmp!=false)
      {
        thingtree.children[i]=tmp;
        // console.log("find father in child");
        return thingtree;
      }
    }
    // console.log("no father in child");
  }
  // console.log("child not exist");
  return false;
}

export default {
  name: 'missionlist',
  props:{
    // thing_list:Array,
    mode:{type:String,default:"todo"},
  },
  data() {
    return {
      items: [],
      layer: -1,
      isExist: true,
      spinShow:true,
    };
  },
  methods: {
    create_thing() {
      window.app.thing.activeThingNode = this;
      this.$router.push({ name: 'thing_creator', params: { view:'mission',lid:'0',mode:this.mode}});
      // console.log(window.app.thing.thing_id);
    },
    // load_thing: function () {
    //   var data = JSON.parse($.ajax({method: "get", url: "/api/thing/list/0" + this.item._id, async: false, data: {"_token": "{{csrf_token()}}"}}).responseText);
    //   console.log(data);
    //   Vue.set(this.item, 'children', data);
    // },
    load_thing(){
      let $vm=this;
      this.spinShow=true;
      let url="/api/thing/list/"+this.mode.toLocaleLowerCase();
      console.log(url);
    //因axios 不支持同步，选中ajax
      $.ajax({
        method: "get",
        url: url,
        async: false,
        success:function(data,textStatus,jqXHR){
          $vm.items=buildlist(data);
          $vm.spinShow=false;
        },
      });
    },
    refresh(id){
      this.spinShow=true;
      this.load_thing();
      if(id){
        for(let key in this.$children){
          if(this.$children[key]._id==id){
            window.app.thing.activeThingNode=this.$children[key];
            break;
          }
        }
      }
      this.spinShow=false;
      return;
    },

  },

  mounted() {
    this.load_thing();
    this.create_thing();//绑定生成器到取当前节点
  },
  watch:{
    mode:function (newVal){
      this.load_thing();
    }
  },

  components:{
    item,
    mission,
  }
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped lang="sass">
  // @import "~bootstrap/scss/bootstrap";
  </style>
