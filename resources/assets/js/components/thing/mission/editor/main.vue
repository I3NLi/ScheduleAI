<template>
  <div id="builder">
    <input type="text" id="title" v-model="modules.Attribut.title" placeholder="Title"/>
    <hr/>
    ID: #{{data._id}}
    <Collapse v-model="Collapse">
      <!-- <Panel name="Modul">
      Modul
      <Tree :data="modul" slot="content" show-checkbox></Tree>
    </Panel> -->
    <Panel v-for="(module,key) in modules" :name="key">
      {{key}}
      <component
      slot="content"
      :is="key"
      :data="module"
      :editor="editor"
      :permissions="modules.Permissions"
      :fulldata="data"/>
    </Panel>
  </Collapse>
  <div class='c_input'>
    <c-input :data='this.data.Contact' :ziel='ziel'/>
  </div>

  <br/>
  <Button
  type="success"
  long
  @click="update()"
  >
  SUBMIT
</Button>
<br/>
<br/>

<Spin size="large" fix v-if="spinShow"/>

</div>

</template>

<script>
import Attribut from './attribut/main';
// import repeat from './repeat/main';
import Mission from '../missionComponent/Editor/Editor';
//import File from '../file/main';
// import Database from './database/main';
import Contact from '../../../contact/panel/panel';
import cInput from '../../../contact/input/input'
import Permissions from './permissions/main'

function in_array(string,array){
  for(let item in array){
    if(array[item]==string){
      return true;
    }
  }
  return false;
}

export default {
  name: 'editor',
  props:{
    data:Object,
  },
  data() {
    return {
      editor:this,
      spinShow:false,
      Collapse:this.data.Collapse,
      // modules:this.data,
      ziel:{
        type:"mission",
        id:this.data._id,
      },
    };
  },
  computed:{
    modules:function (){
      let result={};
      for(let module in this.data){
        if(typeof this.data[module]=="array"||typeof this.data[module]=="object"){
          // console.log(module+":"+typeof( this.data[module]));
          if(!in_array(module,this.data.Modules)){
            // console.log(module+":false");
            continue;
          }
          result[module]=this.data[module];
        }
        // console.log(result);

      }
      return result;
    },

  },
  methods:{
    update(modules,list_fresh=false,message=false){
      if(typeof modules!= "undefined"||modules==[]||modules==null){
        modules=[
          "Attribut",
          "Mission",
        ];
      }
      if(list_fresh!==true)
      {
        list_fresh=false;
      }
      // console.log(modules);
      let vm=this;
      let result=false;
      let data={
        'data':vm.data,
        'modules':modules,
      }

      window.axios.post('/api/thing/update/'+vm.data._id, data)
      .then(function (response) {
        if(list_fresh){
          console.log("thinglist 刷新 in thing/mission/editor/main @update");
          window.app.thing.activeThingNode.$parent.refresh(vm.data._id);
        }
        if(message)
        {
          if(message===true)
          {
            vm.$Message.success('Update successful');
          }else{
            vm.$Message.success('Successful to update '+message);
          }
        }
        result=true;
      })
      .catch(function (error) {
        console.log(error);
        if(message)
        {
          if(message===true)
          {
            vm.$Message.error('Update failed');
          }else{
            vm.$Message.error('Failed to update '+message);
          }
        }

        result=false;
      });
      return result;
    },
    change_title(){
      window.focus();
      return false;
    }
  },
  components: {
    Attribut,
    Mission,
    Contact,
    cInput,
    Permissions,
    //File,
  },
  watch:{
    "data.Attribut.title":function(){
      let modules=["Attribut"];
      this.update(modules,true,true);
    },
    'data.Mission':{
      handler: function (val, oldVal){
        let modules=["Mission"];
        console.log(val);
        this.update(modules,false,"Mission");
      },
      deep: true
    },
    'data.Permissions.owner':{
      handler: function (val, oldVal){
        let modules=["Permissions"];
        console.log(val);
        this.update(modules,false,"Permissions");
      },
      deep: true
    },



  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
/*nav{ height: 42px; border: 1px red; }*/
.c_input{
  position: fixed;
  bottom: 0px;
}
#title{
  width: 100%;
  font-size: 24px;
}
</style>
