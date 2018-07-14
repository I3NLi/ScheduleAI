<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <div id="legend" class="">
        <legend class="">Text Input #{{this.data.id}}</legend>
      </div>
      <form class="form-horizontal">
        <div class="control-group">
          <!-- Text input-->
          <label class="control-label" for="input01">label</label>
          <div class="controls">
            <input v-model="data.label" type="text" placeholder="placeholder" class="input-xlarge">
          </div>
          <label class="control-label" for="input01">placeholder</label>
          <div class="controls">
            <input v-model="data.placeholder" type="text" placeholder="placeholder" class="input-xlarge">
          </div>
          <label class="control-label" for="input01">titel</label>
          <div class="controls">
            <input v-model="data.titel" type="text" placeholder="placeholder" class="input-xlarge">
          </div>
        </div>
      </form>
      <br/>
      <!-- Button -->
      <div class="control-group">
        <div class="controls">

          <Button type="success" @click='change_mode()'>Update</Button>
          <Button type="error"  @click='delete_this()'>Delete</Button>

        </div>
      </div>

    </div>
  </div>

</template>

<script>
// import editor from './editor/editor';
// import viewer from './viewer/viewer';

export default {
  name: "m_input_text_editor",
  props: {
    dataimport:Object,
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
      this.data.value=this.value;
      this.$parent.modifier_mode=false;
      return false;
    },
    delete_this(){
      console.log("删除"+this.$parent.$parent.missions.splice(this.data.id,1));
      return false;
    },
  },
  components: {
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
