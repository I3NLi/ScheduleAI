<template>
  <div id="builder">
    <h2 id="title">{{modules.Attribute.title}}</h2>
    <hr/>
    ID: #{{data._id}}
    <Collapse v-model="Collapse">
      <!-- <Panel name="Modul">
        Modul
        <Tree :data="modul" slot="content" show-checkbox></Tree>
      </Panel> -->
      <Panel v-for="(module,key) in modules" :name="key">
        {{key}}
        <component slot="content" :is="key" :data="module" :permissions="modules.Permissions"/>
      </Panel>
    </Collapse>
    <div class='c_input'>
      <c-input :data='this.data.Contact' :ziel='ziel'/>
    </div>

    <br/>
    <br/>


  </div>

</template>

<script>
import Attribute from './attribute/main';
// import repeat from './repeat/main';
import Mission from '../missionComponent/FormViewer/FormViewer';
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
      Collapse:this.data.Collapse,
      // modules:this.data,
      ziel:{
        type:"mission",
        id:this.data._id,
      },

      // modules:{//根据id远程读入，模板的信息
      //   Attribute:{
      //     title:"undefined",
      //     fatherId:this.data.id,
      //     time:{
      //       type:'once',
      //       data:{
      //         startCondition:'immediately',
      //         startTime:new Date(),
      //         workTimeType:"inherit",
      //         workTime:0,
      //       },
      //     },
      //     planTimeCost:0,
      //     importance:"2",
      //     tags:[],
      //   },
      //   Mission:[],
      //   Owner:[],
      //   // Database:{},
      //   // Contact:{},
      // },
    //   modul:[
    //     {
    //       title: 'Attribute',
    //       expand: true,
    //       multiple:false,
    //       children: [
    //         {
    //           title: 'default',
    //           expand: true,
    //           multiple:false,
    //           children: [
    //           ]
    //         },
    //         {
    //           title: 'repeat',
    //           expand: true,
    //           multiple:false,
    //           children: [
    //           ]
    //         },
    //       ]
    //     },
    //     {
    //       title: 'Mission',
    //       expand: true,
    //       children: [
    //       ]
    //     },
    //     {
    //       title: 'File',
    //       expand: true,
    //       children: [
    //       ]
    //     },
    //     {
    //       title: 'Database',
    //       expand: true,
    //       children: [
    //       ]
    //     },
    //     {
    //       title: 'Contact',
    //       expand: true,
    //       children: [
    //       ]
    //     },
    //
    //   ]
    };
},
computed:{
  // permissions(){
  //   //根据Permission数组下的user->role->permission生成user->permission
  // },
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

  create:function (){
    let vm=this;
    let data={
      'data':vm.data
    }
    console.log("create");
    console.log(data);
    window.axios.post('/api/thing/create/'+vm.data.id, data)
  .then(function (response) {
    // console.log("response");
    // console.log(response);
    window.app.thing.activeThingNode.refresh();
    window.app.thing.thing_id=response._id;
    window.app.thing.currentView="mission";
  })
  .catch(function (error) {
    console.log(error);
  });

},
update(modules,list_fresh=false,message=false){
  if(typeof modules!= "undefined"||modules==[]||modules==null){
    modules=[
      "Attribute",
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

},
watch:{
  'data.Mission':{
    handler: function (val, oldVal){
      let modules=["Mission"];
      console.log(val);
      this.update(modules,false,"Mission");
    },
    deep: true
  },
},
components: {
  Attribute,
  Mission,
  Contact,
  cInput,
  Permissions,
  //File,
},
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped >
/*nav{ height: 42px; border: 1px red; }*/
.c_input{
  position: fixed;
  bottom: 0px;
}
</style>
