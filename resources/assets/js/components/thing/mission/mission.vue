<template>
<div id='mission' class="full">
  <!-- <viewer v-show='mode'/> -->
  <!--
    <nav class="navbar navbar-default" role="navigation">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="example-navbar-collapse">
          <ul class="nav navbar-nav" style="float:right">
            <li v-show="mode=='viewer'"><a @click="mode_editor"><Icon type="wrench" ></Icon></a></li>
            <li v-show="mode=='editor'"><a @click="mode_viewer"><Icon type="edit"></Icon></span></a></li>
          </ul>
        </div>
      </div>
    </nav> -->


  <ul class="nav nav-tabs">
    <li role="presentation" class="active"><a href="#">Attributes</a></li>
    <li role="presentation"><a href="#">Missions</a></li>
    <li role="presentation"><a href="#">Permissions</a></li>
  </ul>

  </Menu>




  <component :is="mode" :data="data" :id="id" /></component>
  <Spin size="large" fix v-if="spinShow"></Spin>
</div>
</template>

<script>
import viewer from './viewer/main';
import editor from './editor/main';

export default {
  name: 'mission',
  props:{
    id: [Number,String],
    // mode:{//true viewer,false editor
    //   type:String,
    //   // default:true,
    //   default:'viewer',
    // },
  },
  data() {

    return {
      mode:'viewer',
      data:this.get_data(),
      spinShow:true,
    };
  },
  components: {
    // viewer,
    editor,
    viewer,
  },
  methods:{
    mode_viewer(){
      this.mode="viewer";
      //console.log("set viewer");
    },
    mode_editor(){
      this.mode="editor";
    },

    get_data(){
      this.spinShow=true;
      let vm=this;
      let result
      $.ajax({
        url:'/api/thing/get/'+vm.id,
        type:'GET', //GET
        async:false, //或false,是否异步
        timeout:5000, //超时时间
        dataType:'json', //返回的数据格式：
        beforeSend:function(xhr){
        },
        success:function(data,textStatus,jqXHR){
          console.log("刷新任务 ID:"+vm.id);
          console.log(data[0]);
          result=data[0];
        },
        error:function(xhr,textStatus){
        },
        complete:function(){
        }
      });
      this.spinShow=false;
      return result;
      }
    },
    created() {
      this.get_data();
      // window.app.mission=this;
      this.$nextTick(
        function init() {

          // return $('#thing_list').mCustomScrollbar({ theme: 'light-2' });
          // Code that will run only after the
          // entire view has been rendered
        },
      );
    },
    watch:{
      'id':function (){
        this.data=this.get_data();
      }

    },

  };
  </script>

  <!-- Add "scoped" Attribute to limit CSS to this component only -->
  <style scoped >
  /*nav{ height: 42px; border: 1px red; }*/

  </style>
