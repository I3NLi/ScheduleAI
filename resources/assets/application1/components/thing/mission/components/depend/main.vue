<!--
本组件描述了事件的依赖关系


-->
<template>
  <div class="full" id='thing_depend'>
    <div>father</div>
    <hr/>
    <div>Belongs</div>
    <hr/>
    <div>children</div>
    <br/>
    <br/>
  </div>
</template>

<script>
// import navbar from './navbar/navbar';


export default {
  name: 'thing_depend',
  props:{
    xxx:{
      type:String,
      default:'navbar',
    },
  },
  data() {
    return {
    };
  },
  computed: {

  },
  methods: {
  },
  watch:{
  },
  mounted() {
  },
  components: {

  },
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
