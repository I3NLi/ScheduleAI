<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <div id="legend" class="">
        <legend class="">Text #{{this.data.id}}</legend>
      </div>
      <quill-editor ref="myTextEditor"
      v-model="data.content"
      :options="data.editorOption"
>
    </quill-editor>
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
// import QuillEditor from 'vue-quill-editor'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: "text",
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
      // this.data.value=this.value;
      this.$parent.modifier_mode=false;
    },
    delete_this(){
      console.log("删除"+this.$parent.$parent.missions.splice(this.data.id,1));
    },
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill
    }
  },
  components: {
    quillEditor
  },
  mounted() {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
