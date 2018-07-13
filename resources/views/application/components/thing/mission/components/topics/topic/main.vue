<!--
话题内容






-->

<template>

    <div  class="full" id='thing_topic'>
      <router-link :to="{ name: '', query: {} }">&lt; 话题</router-link>
      <content/>
    </div>


</template>

<script>
import content from '@/components/contact/panel/panel';


export default {
  name: 'thing_topic',
  props:{
    topic:{
      type:Array,
      default:[],
    },
    topicName:{
      type:String,
      default:'Undefined',
    },
    thing:{
      type:Object,
      default:{},
    },
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
    content,
  },
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
