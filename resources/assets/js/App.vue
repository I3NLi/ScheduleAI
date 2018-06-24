<template>
  <div id='app' class="">
    <Menu mode="horizontal"
    :theme="'primary'"
    active-name="currentView"
    @on-select="setCurrentView"
    >

    <MenuItem name="calendar" >
      <Icon type="calendar"/>&nbsp&nbsp日历
    </MenuItem>
    <MenuItem name="thing" >
      <Icon type="clipboard"/>&nbsp&nbsp事件
    </MenuItem>
    <MenuItem name="organization" >
      <Icon type="person-stalker"/>&nbsp&nbsp组织
    </MenuItem>
    <MenuItem name="contact" >
      <Icon type="chatboxes"/>&nbsp&nbsp联系人
    </MenuItem>
    <Submenu name="Config" style="float:right">
      <template slot="title">
        <Icon type="stats-bars"></Icon>
        Config
      </template>
      <!-- <MenuGroup title="使用">
      <MenuItem name="3-1">新增和启动</MenuItem>
      <MenuItem name="3-2">活跃分析</MenuItem>
      <MenuItem name="3-3">时段分析</MenuItem>
    </MenuGroup> -->
    <MenuGroup title="System">
      <MenuItem name="logout">Logout</MenuItem>
    </MenuGroup>
  </Submenu>
  <!-- <MenuItem name="4">
  <Icon type="settings"></Icon>
  综合设置
</MenuItem> -->
</Menu>


<div class="content ">
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</div>
</div>
</template>

<script>

export default {
  name: 'app',
  data(){
    return {

    };
  },
  methods:{
    setCurrentView(view){
      // console.log(view);
      if (view=="logout") {
        this.logout();
      }
      else if(view!='#')
      {
        this.$router.push({name:view});
      }
      return false;
    },
    logout(){
      console.log("try logout");
      axios.post('/logout', {})
      .then(function (response) {
        location.reload();
        console.log("logout");
      })
      .catch(function (error) {
        console.log(error);
      });


    }

  },
  components: {

  },



};
</script>

<style lang="less">


</style>
<style>
html,body,#app{
  height:100%;
  margin: 0px;
}

/*载入中*/
.demo-spin-icon-load{
  animation: ani-demo-spin 1s linear infinite;
}
.demo-spin-container{
  display: inline-block;
  width: 200px;
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
/*通用*/
.full{
  height:100%;
  width: 100%;
}

.inline-block{
  display: inline-block;
}
.fullheight{
  height:100%;
}
.content{
  height:calc(100% - 60px);
  margin: 0px;
}
.navbar{
  margin-bottom: 0px;
}
/*v-bar */
.v-bar-container{
  height: calc(100% - 4px);
  height: 100%;
}

.vb > .vb-dragger {
  z-index: 5;
  width: 12px;
  right: 0;
}

.vb > .vb-dragger > .vb-dragger-styler {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: rotate3d(0,0,0,0);
  transform: rotate3d(0,0,0,0);
  -webkit-transition:
  background-color 100ms ease-out,
  margin 100ms ease-out,
  height 100ms ease-out;
  transition:
  background-color 100ms ease-out,
  margin 100ms ease-out,
  height 100ms ease-out;
  background-color: rgba(48, 121, 244,.1);
  margin: 5px 5px 5px 0;
  border-radius: 20px;
  height: calc(100% - 10px);
  display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(48, 121, 244,.3);
}

.vb > .vb-dragger:hover > .vb-dragger-styler {
  background-color: rgba(48, 121, 244,.5);
  margin: 0px;
  height: 100%;
}

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(48, 121, 244,.5);
  margin: 0px;
  height: 100%;
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(48, 121, 244,.5);
}
</style>
