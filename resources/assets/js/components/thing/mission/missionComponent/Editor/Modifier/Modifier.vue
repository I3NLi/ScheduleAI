<template>
  <form id='MissionBuilderFormViewer'  class='form-horizontal'>
    <!-- <item v-for='mission in missions' :is='mission.type' :Attributes='mission' :modifier_mode='false' onclick='change_mode($event)'/> -->
    <div v-for='mission in missions' class='mcs'>
      <item
        :is='mission.type'
        :dataimport='mission'
        :modifier_mode='false'
        :modifiable='true' />
    </div>

    <div class='panel panel-default' >
      <div class='panel-body' @click='open_builder()' v-show='this.$parent.modifier_mode'>
        点击这里创建新的组件
      </div>
  </div>
  </form>
</template>

<script>
import componentslist from '../../component/componentlist';

export default {
  name: "Modifier",
  props: {
      missions: Array
  },
  data: function () {
      return {

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
  components: componentslist.components
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
