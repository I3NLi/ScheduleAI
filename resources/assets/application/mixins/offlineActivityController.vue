<script>
export default {
  methods: {
    //创建活动
    $createActivity(activity) {
      activity.id = activity.id ? activity.id : Math.floor(Math.random() * 1000 + 1000);
      this.$root.activities.push(activity);
    },
    //更新所有活动
    $updateActivities() {
      return true;
    },
    //更新单一活动
    $updateActivity(activity) {
      return true;
    },
    //删除活动
    deleteActivity(activity){

    }
  },
  computed: {

  },
  components: {

  },
  watch: {

  }
};
</script>
