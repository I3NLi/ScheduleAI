<template>
<div id='mission_builder_editor'>
  <Modifier :missions='missions' v-show='modifier_mode'/>
  <Builder :missions='missions' v-show='!modifier_mode'/>
</div>
</template>

<script>
import Builder from './Builder/Builder';
import Modifier from './Modifier/Modifier';

export default {
  name: "Editor",
  props: {
    missions: {
      type:Array,
      required: true,
    },
  },
  data: function () {
      return {
          modifier_mode: true
      };
  },
  computed: {
  },
  components: {
      Modifier,
      Builder
  }
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped>

</style>
