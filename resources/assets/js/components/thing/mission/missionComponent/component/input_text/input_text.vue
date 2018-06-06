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
  name: "m_input_text",
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
          //这里修改默认值
          type:'m_input_text',//必需 不可更改 与name保持一致
          label:'label',
          placeholder:'placeholder',
          titel:'这是一个input_text组件',
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
    // console.log(this.data);
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
