<template>
  <div class="row" id='contact'>
    <div id='navbar'>
    <navbar/>
    </div>
    <Tabs value="name1">
        <TabPane label="主页" name="name1">标签一的内容</TabPane>
        <TabPane label="组织" name="name2">标签二的内容</TabPane>
        <TabPane label="任务" name="name3">标签三的内容</TabPane>
        <TabPane label="管理" name="name3">标签三的内容</TabPane>
    </Tabs>
  </div>
</template>

<script>
import navbar from './navbar/navbar';
import organization from './organization/organization';

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  components:{navbar},

};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped>
.row{
  height:100%;
}
#navbar{
  overflow: visible;
  height: 100%;
  width: 240px;
  float: left;
}
.ivu-scroll-container{
  height: 100% !important;
}

.ivu-scroll-wrapper{
  height:calc(100%) !important;
}
</style>
