<template>
  <div id="builder">
    <input type="text" id="title" v-model="modules.Attribute.title" placeholder="Title"/>
    <!-- <h2 id="title" contenteditable="true" @keydown.enter="change_title" v-on:blur="change_title" >{{modules.Attribute.title}}</h2> -->
    <hr/>
    Father Id: #{{data.id}}
    <Collapse v-model="Collapse">
      <!-- <Panel name="Modul">
      Modul
      <Tree :data="modul" slot="content" show-checkbox></Tree>
    </Panel> -->
    <Panel v-for="(module,key) in modules":key="key" :name="key">
      {{key}}
      <component slot="content" :is="key" :data="module" :permissions="modules.Permissions"/>
    </Panel>
  </Collapse>
  <div class='c_input'>
    <c-input :data='this.data.template.Contact' :ziel='ziel'/>
  </div>
  <br/>
  <Button
  type="success"
  long
  @click="create">SUBMIT</Button>
  <br/>
  <br/>
  <br/>
  <!-- 加载中图标 -->
  <Spin size="large" fix v-if="spinShow">
    <Icon type="load-c" size=18 class="demo-spin-icon-load"/>
    <div>submitting...</div>
  </Spin>
</div>

</template>

<script>
import Attribute from './attribute/main';
// import repeat from './repeat/main';
import Mission from '../../missionComponent/Editor/Editor';
//import File from '../file/main';
// import Database from './database/main';
import Contact from '../../../../chatroom/panel/panel';
import cInput from '../../../../chatroom/input/input';
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
  name: 'mission',
  props:{
    data:Object,
  },
  data() {
    return {
      Collapse:this.data.template.Collapse,
      // modules:this.data.template,
      ziel:{
        type:"missionBuilder",
        id:this.data.id,
      },
      spinShow:false,
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
      for(let module in this.data.template){
        if(typeof this.data.template[module]=="array"||typeof this.data.template[module]=="object"){
          // console.log(module+":"+typeof( this.data.template[module]));
          if(!in_array(module,this.data.template.Modules)){
            // console.log(module+":false");
            continue;

          }
          result[module]=this.data.template[module];
        }
        // console.log(result);

      }
      return result;
    },

  },
  methods:{

    create:function (){
      this.spinShow=true;
      let vm=this;
      let data={
        'data':vm.data.template
      }
      window.axios.post('/api/thing/create/'+vm.data.id, data)
      .then(function (response) {
        console.log(response);
        vm.after_create(response.data._id);
      })
      .catch(function (error) {
        alert("提交失败"+error);
        this.spinShow=false;
      });

    },
    change_title(){
      window.focus();
      return false;
    },
    after_create(id){
      let vm=this;
      console.log(id);
      window.axios.get('/api/thing/get/'+id)
      .then(function (response) {
        if(response.data[0]._id==id){
        console.log("任务创建成功");
        vm.$router.push({
          name: 'thing_viewer',
          query: {
            view: 'mission',
            mode: 'todo',
            lid: response.data[0].Attribute.fatherId,
            tid: response.data[0]._id,
          },
        });
        }else{
          console.log("任务未创建 延时1s");
          setTimeout(vm.after_create(id),1000)
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    }
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
#title{
  width: 100%;
  font-size: 24px;
}
.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
@keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
</style>
