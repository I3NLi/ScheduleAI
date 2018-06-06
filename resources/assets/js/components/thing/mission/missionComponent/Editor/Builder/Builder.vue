<template>
  <div id='MissionBuilderFormViewer'  class='form-horizontal'>
    这里是生成器<button @click='change_mode'>x</button>
    <div v-for='component in components'  class='mcs' @click='create_mission(component)'>
      <item  :is='component' :modifier_mode='false'  />
    </div>
  </div>
</template>

<script>
import componentslist from '../../component/componentlist';

export default {
  name: "Builder",
  props: {
    missions: Array
  },
  data: function () {
    // console.log(components);
      return {
         components:componentslist.components
      };
  },
  computed: {
  },
  methods: {
      change_mode: function () {
          this.$parent.modifier_mode=true;
      },
      create_mission:function (component){
          let datatmp=component.data().data;
          datatmp.id=this.missions.length;
          this.missions.push(datatmp);
          this.change_mode();
          console.log(datatmp)

      }
  },
  components: {

  }
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped>
.mcs{
  border: 1px solid green;
}
</style>
