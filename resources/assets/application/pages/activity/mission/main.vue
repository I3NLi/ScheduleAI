<template>
<mu-container id="Mission">
  <mu-form :model="data" label-position="left" label-width="50">

    <mu-form-item >
      <Icon type="md-checkmark-circle-outline" size="24" slot="label" class="completeButton" color="data.status==2?#19be6b:#c5c8ce"/>
      <span style="width: calc(100% - 65px)">
      <mu-text-field v-model="data.name"></mu-text-field>
      </span>
      <Button @click="config.modifymode=!config.modifymode">
        {{config.modifymode?'Edit':'Save'}}
      </Button>
    </mu-form-item>

    <mu-form-item >
      <mu-text-field multi-line :rows="3" v-model="data.description"></mu-text-field>
    </mu-form-item>

    <mu-form-item  label="Tage">
      <input-tag :tags="data.tags" class="tags" :add-tag-on-blur="true" />
    </mu-form-item>
  </mu-form>

  <FormViewer v-show="!config.modifymode" :data="missions" />
  <Editor :missions="missions" v-if="config.modifiable" v-show="config.modifymode" />

</mu-container>
</template>

<script>
import FormViewer from './FormViewer/FormViewer';
import Editor from './Editor/Editor';
import InputTag from 'vue-input-tag';

export default {
  name: "MissionBuilder",
  props: {
    attr: Object,
    data: {
      type: Object,
      default: {
        missions: []
      },
    },
  },
  data: function() {
    if(typeof(this.data.missions)!="Array"){
      this.data.missions=[];
    }
    return {
      //config 由生成时定义
      config: {
        modifiable: true, //是否允许修改
        modifymode: true //是否为修改模式
      },
      missions:this.data.missions,
    };
  },
  components: {
    //载入组件
    FormViewer,
    Editor,
    InputTag,
  },
  methods: {
    //开\关修改模式
    change_mode: function() {
      if (this.config.modifiable) {
        this.config.modifymode = !this.config.modifymode;
        return this.config.modifymode;
      } else {
        alert("载入编辑器失败，因为组件被声明为只读");
      }
    }
  },
  created: function() {
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
.completeButton:hover{
  color: #19be6b;
}
.completeButton{

}
</style>
