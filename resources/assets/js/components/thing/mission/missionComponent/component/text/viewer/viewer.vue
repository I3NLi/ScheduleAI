<template>
  <!-- <p @click='change_mode()'>
    {{data.value}}
  </p> -->
  <div @click='change_mode()' class="html ql-editor" v-html="data.content"></div>
</template>

<script>
// import editor from './editor/editor';
// import viewer from './viewer/viewer';

export default {
  name: "text",
  props: {
    dataimport:Object,
    modifiable:Boolean,
  },
  data: function () {
    return {
      data: this.dataimport,
    };
  },
  computed: {
  },
  methods:{
    change_mode(){
      if(this.modifiable)
        {this.$parent.modifier_mode=true;};
    }
  },
  components: {
    // editor,
    // viewer,
  },
  mounted() {

    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
    })
  }
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped>

</style>
