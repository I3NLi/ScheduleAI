<!--
话题






-->

<template>
  <div class="full" id='thing_topics'>
    <Page :total="10" show-elevator></Page>
  </div>
</template>

<script>
import topic from './topic/main';


export default {
  name: 'thing_topics',
  props:{
    // xxx:{
    //   type:String,
    //   default:'navbar',
    // },
  },
  data() {
    return {
      pageTotal: 0,
      pageNum: 1,
      pageSize: 10,
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
    topic
  },
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
