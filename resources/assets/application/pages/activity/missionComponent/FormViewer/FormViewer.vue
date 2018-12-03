<template>
<form id='MissionBuilderFormViewer'  class='form-horizontal'>
  <item v-for='(mission,index) in data'
  :is='mission.type'
  :key='index'
  :dataimport='mission'
  :modifier_mode='false'/>

</form>
</template>

<script>
import componentslist from '../component/componentlist';

export default {
  name: "FormViewer",
  props: {
      data: Array
  },
  data: function () {
      return {
      };
  },
  computed: {
  },
  methods: {
  },
  components: componentslist.components,
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped>

</style>
