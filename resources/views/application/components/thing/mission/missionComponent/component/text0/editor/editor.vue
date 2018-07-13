<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <div id="legend" class="">
        <legend class="">Text #{{this.data.id}}</legend>
      </div>
      <form class="form-horizontal">
        <div class="control-group">
          <!-- Text input-->
          <label class="control-label" for="input01">内容</label>
          <div class="controls">
            <Input
            v-model="data.value"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入...">
          </Input>
        </div>
        <label class="control-label" for="input01">说明文本</label>
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
