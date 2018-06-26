<template>
  <div :_id="thing_id">
    <li class="list-group-item"
    @click="show_thing" >
    <span  v-for="n in layer" :key="n">&nbsp&nbsp&nbsp&nbsp</span>
    <span
    :class="{
      'icon expand-icon glyphicon glyphicon-plus':!open,
      'icon expand-icon glyphicon glyphicon-minus':open}"
      @click.stop="toggle"></span>
      <span>#{{item._id.substr(-4,4)}}&nbsp&nbsp</span>
      {{item.Attribute.title}}
      <span style="float:right" class="badge badge-default badge-pill" >待完善</span>
    </li>
    <div :_id="'ul_'+index" v-if="open">
      <item
      v-for="(item, index) in  item.children"
      v-bind:item="item"
      v-bind:index="index"
      :key="index"
      ></item>
      <li class="list-group-item justify-content-between" style='color:undefined;background-color:undefined;'  @click="create_thing">
        <span  v-for="n in layer+1" :key="n">&nbsp&nbsp&nbsp&nbsp</span>
        <span  >新建事件++++</span>
      </li>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: 'item',
  props: {
    item: Object,
    index: Number,
    mode:String,
  },
  data: function () {
    return {
      open: false,
      layer: this.$parent.layer + 1
    }
  },
  computed: {
    isFolder: function () {

    },
    open_Icon: function () {
      return open ? "icon expand-icon glyphicon glyphicon-plus" : "icon expand-icon glyphicon glyphicon-minus";
    },
    thing_id: function () {
      return "thing" + this.item._id;
    }

  },
  watch:{
    open:function(val){
      if (val) {
        this.load_thing();
      }
    }

  },
  methods: {
    toggle: function () {
      this.open = !this.open
    },
    show_thing: function () {
      // $("#iframe_thing").attr("src", "{{url('/thing/show')}}/" + this.item._id);
      if (!this.open) {
        //alert("{{url('/thing/query')}}/"+this.item._id);
        this.open = !this.open
        this.load_thing();
        // var data = JSON.parse($.ajax({method: "get", url: "/api/thing/list/" + this.item._id, async: false, data: {"_token": "{{csrf_token()}}"}}).responseText);
        // // console.log(data);
        // Vue.set(this.item, 'children', data);
      }
      window.app.thing.activeThingNode = this;
      window.app.thing.thing_id=this.item._id;
      this.$router.push({ name: 'thing_viewer', params: { view:'mission',lid:this.item._id,mode:this.mode,id:this.item._id}});
    },
    addChild: function () {
      this.model.children.push({
        name: 'new stuff'
      })
    },
    create_thing: function () {
      window.app.thing.activeThingNode = this;
      this.$router.push({ name: 'thing_creator', params: { view:'mission',lid:this.item._id,mode:this.mode,id:this.item._id}});
    },
    load_thing: function () {
      //console.log("刷新missionlist.item");
      let vm=this;
      $.ajax({
        method: "get",
        url: "/api/thing/list/" + this.item._id,
        async: true,
        success:function(data,textStatus,jqXHR){
          Vue.set(vm.item, 'children', data);
        },
      });
      window.app.thing.activeThingNode = this;
      //
    },
    refresh(id){
      this.open=false;
      this.load_thing();
      this.$nextTick(function () {
        this.open=true;
        if(id){
          for(let key in this.$children){
            console.log(key);
            console.log(this.$children[key]);
            if(this.$children[key]._id==id)
            {

            window.app.thing.activeThingNode=this.$children[key];
            return;
            }
          }
        }
      }

    );




  }

},
components:{

}
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped lang="sass">
  // @import "~bootstrap/scss/bootstrap";
  </style>
