<template>
  <div>
    <editor :dataimport='data' v-show='modifier_mode'/>
    <viewer :dataimport='data' v-show='!modifier_mode' :modifiable='modifiable'/>
  </div>
</template>

<script>
import editor from './editor/editor';
import viewer from './viewer/viewer';

export default {
  //name必须与type保持一致
  //type 不可以被更改
  name: "m_text",
  props: {
    dataimport:Object,
    modifiermode:Boolean,
    modifiable:Boolean,
  },
  data: function () {
    let data_tem;
    if(typeof this.dataimport=="undefined")
      {
        data_tem={
          type:'m_text',
          value:'这是一个text组件',
        };
      }else{
         data_tem=this.dataimport;
      }
    return {
        data: data_tem,
        modifier_mode:this.modifiermode,
      };
  },
  computed: {
  },
  methods:{
    // change_mode(){
    //   if(this.modifiable){this.$parent.modifiermode=true;};
    // }

  },
  components: {
      editor,
      viewer,
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
