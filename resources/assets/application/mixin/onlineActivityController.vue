<script>
export default {
  methods: {
    //加载所有活动
    loadActivities(){


    }
    //创建活动
    createActivity(){

    }
    //更新所有活动
    updateActivities(){
       this.$root.updateActivities();
     }
    //更新单一活动
    updateActivity(activity){
      this.$root.updateActivities();
    }
    //删除活动
    deleteActivity(){
       this.$root.updateActivities();
     }
  },
  computed:{

  },
  components: {

  },
  watch:{

  }
};
</script>
