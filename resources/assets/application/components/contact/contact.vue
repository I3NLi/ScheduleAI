<template>
<div class="full">
  <Split v-model="spiltWidth" min="40px" class="contact-split">
    <c-list slot="left" :ziel='ziel' class="c_list"/>
    <div slot="right" class="splitRight">
      <c-panel :data='data' class='c_panel' />
      <c-input :data='data' :ziel='ziel' class='c_input' />
    </div>
  </Split>
  </div>

</template>

<script>
import c_panel from '../chatroom/panel/panel'
import c_input from '../chatroom/input/input'
import c_list from './list/list'


export default {
  name: 'contact',
  data() {
    return {
      spiltWidth: "240px",
      spiltHeight: "600px",
      ziel: {
        type: 'default', //目标聊天室
        id: null,
      }, //目标聊天室
      data:[],
      // data: {
      //   directContact: [{
      //       user_id:"5b823a1f0858b200a802d58b",
      //       name:"aaaaa",
      //       status:"normal",//blacklist 黑名单
      //       charroom_id:null,
      //       tags:[],
      //       user:{},
      //       messages:[]
      //   },{
      //       user_id:"5b823a1f0858b200a802d58b",
      //       name:"bbbbb",
      //       status:"normal",//blacklist 黑名单
      //       charroom_id:null,
      //       tags:[],
      //       user:{},
      //       messages:[]
      //   },{
      //       user_id:"5b823a1f0858b200a802d58b",
      //       name:"admin",
      //       status:"normal",//blacklist 黑名单
      //       charroom_id:null,
      //       tags:[],
      //       user:{},
      //       messages:[]
      //   },
      //   ],
      //   gruppeContact: [{
      //   }],
      // }, //储存交互数据
    };
  },
  components: {
    cPanel: c_panel,
    cInput: c_input,
    cList: c_list,
  },
  mounted() {
    // $(".contact").mCustomScrollbar();
    // $(".c_panel").mCustomScrollbar();
    function fakedata() {
      this.data.push({
        user: {
          //
          id: 0,
          img: "/testP/images.jpg",
        },
        component: {
          type: 'text',
          content: this.msg,
        }
      });
    }
  },
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped >
.ivu-scroll-container {
  height: 100% !important;
}

.ivu-scroll-wrapper {
  height: calc(100%) !important;
}

.c_list {
  overflow: visible;
  background: #515a6e;
  /* float: left; */
}

.c_panel {
  overflow: visible;
  background: #efefef;
  height: 100%;
  /* width: calc(100% - 244px); */
  /* float: right; */
}

.splitRight{
  height:100%;
}
.c_input {
  position: absolute;
  width: 100%;
  bottom: 0px;
  padding-left: 8px;
  padding-right: 2px;
}
</style>

<style>

.contact-split>.ivu-split-horizontal>.left-pane{
      background: #515a6e;
}

</style>
