<template>
  <div id="Mission">
    <FormViewer v-show="!config.modifymode" :data="missions" />
    <Editor :data="missions" v-if="config.modifiable"  v-show="config.modifymode" />
  </div>
</template>

<script>
import FormViewer from './FormViewer/FormViewer';
import Editor from './Editor/Editor';

export default {
  name: "MissionBuilder",
  props: {
    attr: Object,
    data:{
      type: Array,
      default:[],
    },
  },
  data: function () {
    return {
      //config 由生成时定义
      config: {
        modifiable: true, //是否允许修改
        modifymode: true //是否为修改模式
      },
      missions: [
      ]
    };
  },
  components: {
    //载入组件
    FormViewer,
    Editor,
  },
  methods: {
    //开\关修改模式
    change_mode: function () {
      if (this.config.modifiable) {
        this.config.modifymode = !this.config.modifymode;
        return this.config.modifymode;
      } else {
        alert("载入编辑器失败，因为组件被声明为只读");
      }
    }
  },
  created: function () {
    //如果不允许修改,则关闭修改模式
    // if (!this.modifiable) {
    //   this.modifymode = false;
    // }
    // window.MISSIONBUILDER.MISSIONS_TARGET = this.missions;
  }
}

</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped >
/*nav{ height: 42px; border: 1px red; }*/
</style>
