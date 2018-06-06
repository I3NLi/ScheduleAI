<template>
  <div class="row" id='contact'>
    
  </div>
</template>

<script>
import navbar from './navbar/navbar';
// import missionlist from './missionlist/missionlist';

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
