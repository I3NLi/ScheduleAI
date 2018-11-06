<!--
组件选择器

全部zu'jian
  -->

<template>
  <div id='missionCreator'>

    <component :is="data.currentView" :data="data"></component>

  </div>
</template>

<script>
 import creator from './creator/main';
 import builder from './builder/main';


export default {
  name: 'mission_creator',
  props:{
    id:{
      type:[Number,String],
      default:0,
    }
  },
  data() {
    return {
      data:{
        currentView:'creator',
        id:this.id,
        template:null,
      }
    };
  },
  components: {
    creator,
    builder,
  },
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped >
/*nav{ height: 42px; border: 1px red; }*/
.template{
  width: 70px;
  text-align: center;
  display: inline-block;
}
div.template>img{
  width:50px;
  height: 50px;
  display:inline;
}

div.template>label{
  text-align: center;

}
</style>
