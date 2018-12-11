<template>
<div id='MissionBuilderFormViewer' class='form-horizontal'>
  <Divider>这里是生成器&nbsp&nbsp<button @click='change_mode'>x</button></Divider>
  <Card v-for='component in components' class='mcs' :key="component.name" @click.native='create_mission(component)'>
    <item :is='component' :modifier_mode='false'  />
  </Card>
</div>
</template>

<script>
import componentslist from '../../component/componentlist';

export default {
  name: "Builder",
  props: {
    missions: {
      type: Array,
      required: true,
    },
  },

  data: function() {
    // console.log(components);
    return {
      components: componentslist.components
    };
  },
  computed: {},
  methods: {
    change_mode() {
      this.$parent.modifier_mode = true;
    },
    create_mission(component) {
      console.log("xx");
      let datatmp = component.data().data;
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
.mcs {
  /* border: 1px solid green; */
}
</style>
