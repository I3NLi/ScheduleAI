






<!-- 本文件暂时被废弃 -->






<template>
<div id='mission' class="full">
  <component :is="mode" :data="data" :id="id" /></component>

</div>
</template>

<script>
import viewer from './viewer/main';
import editor from './editor/main';

export default {
  name: 'mission',
  props:{
    id: [Number,String],
  },
  data() {
    console.log("viewer");
    console.log(this.id);
    return {
      mode:'viewer',
      data:{},
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
          result=data[0];
          this.spinShow=false;
          this.data=result;
        },
        error:function(xhr,textStatus){
        },
        complete:function(){
        }
      });
      }
    },
    mounted() {
      this.get_data();
      this.$nextTick(
        function init() {

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
