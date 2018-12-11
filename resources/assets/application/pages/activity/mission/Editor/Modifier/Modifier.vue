<template>
  <form id='MissionBuilderFormViewer'  class='form-horizontal'>
    <!-- <item v-for='mission in missions' :is='mission.type' :Attributes='mission' :modifier_mode='false' onclick='change_mode($event)'/> -->
    <!-- <div v-for='mission in missions' class='mcs'>
      <item
        :is='mission.type'
        :dataimport='mission'
        :modifier_mode='false'
        :modifiable='true' />
    </div> -->
    <draggable class="list-group" v-model="missions" @start="drag=true" @end="drag=false" :options="draggableOptions">
      <!-- <slide-del v-for='mission in missions' :key="index" ref="slipDel" del-text="" @slip-open="" delCls="ivu-btn-success"> -->
      <div v-for='mission in missions' class='mcs'>
        <item
          :is='mission.type'
          :dataimport='mission'
          :modifier_mode='false'
          :modifiable='true' />
      </div>
        <!-- <span slot="del" >Delete</span> -->
      <!-- </slide-del> -->
      <!-- <mu-sub-header>Extends</mu-sub-header> -->
  </draggable>

    <div class='panel panel-default' >
      <div class='panel-body' @click='open_builder()' v-show='this.$parent.modifier_mode'>
        点击这里创建新的组件
      </div>
  </div>
  </form>
</template>

<script>
import componentslist from '../../component/componentlist';
import draggable from 'vuedraggable';

export default {
  name: "Modifier",
  props: {
      missions: Array
  },
  data: function () {
      return {
        draggableOptions:{
          delay: 300
        }
      };
  },
  computed: {
  },
  methods: {
      set_modify_mode: function (event) {
          event.currentTarget.modifier_mode = 'true';
      },
      open_builder:function(){
          this.$parent.modifier_mode=false;//设置编辑器为生成模式
      }
  },
  components: Object.assign({draggable},componentslist.components) ,
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped>

</style>
