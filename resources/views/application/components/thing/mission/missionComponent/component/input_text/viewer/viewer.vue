<template>
  <!-- <div @click='change_mode()'>
    <input type='text' :value='data.value' :title='data.title' :placeholder='data.placeholder'></input>
  </div> -->
  <div @click='change_mode()'>
    <Form  :label-width="80" >
      <FormItem :label="data.label">
        <Input v-model="data.value" :title='data.title' :placeholder='data.placeholder'></Input>
      </FormItem>
    </Form>
  </div>


</template>

<script>
// import editor from './editor/editor';
// import viewer from './viewer/viewer';

export default {
  name: "m_input_text_viewer",
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
