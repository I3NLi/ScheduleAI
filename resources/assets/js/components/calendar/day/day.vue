<template>
  <div  id='day'>
    <div style="width:calc(100% - 404px);" class="inline-block fullheight">
      <div v-bar="{
        preventParentScroll: true,
        scrollThrottle: 30,
        }" class="full">
        <div class="v-bar-container">
          <daybody/>
        </div>
      </div>
    </div>

      <div style="width: 400px;" class="inline-block fullheight">
        <div v-bar="{
          preventParentScroll: true,
          scrollThrottle: 30,
          }" class="full">
          <div class="v-bar-container">
            <mission/>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
  import mission from '../../thing/mission/mission';
  import daybody from './components/body';

  export default {
    name: 'day',
    data() {
      return {
        OpenMission:false,
      };
    },
    components:{
      mission,
      daybody,
    }
  };
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .link{
    width:calc(100% - 204px);
  }
  .right{
    width:200px;
    height: 100%;
  }
  .header{
    width: 100%;
    height: 52px !important;
    background: blue;
  }
  </style>
