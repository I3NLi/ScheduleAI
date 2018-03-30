<template>
  <div class="full" id='contact'>
    <div class='c_list'>
      <c-list :ziel='ziel' />
    </div>
    <div class='c_panel'>
      <div style="height:100%">
      <c-panel :data='data' />
      </div>
      <div class='c_input'>
      <c-input :data='data' :ziel='ziel'/>
    </div>
    </div>
  </div>
</template>

<script>
import c_panel from './panel/panel'
import c_input from './input/input'
import c_list from './list/list'

// import $ from 'jquery';
// require('malihu-custom-scrollbar-plugin');

export default {
  name: 'contact',
  data() {
    return {

      ziel:{
        type:'default',//目标聊天室
        id:null,
      },//目标聊天室
      data:[],//储存交互数据
    };
  },
  components: {
    cPanel:c_panel,
    cInput:c_input,
    cList:c_list,
  },
  mounted(){
    // $(".contact").mCustomScrollbar();
    // $(".c_panel").mCustomScrollbar();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped >

.c_list{
  overflow: visible;
  height: 100%;
  width: 240px;
  float: left;
}
.c_panel{
  overflow: visible;
  height: 100%;
  width:calc(100% - 244px);
  float: right;
}
.ivu-scroll-container{
  height: 100% !important;
}

.ivu-scroll-wrapper{
  height:calc(100%) !important;
}
.c_input{
  position: fixed;
  bottom: 0px;
}
</style>
