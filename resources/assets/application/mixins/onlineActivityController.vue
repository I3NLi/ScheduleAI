<script>
export default {
  methods: {
    //加载所有活动
    $loadActivities() {
      let vm=this.$root;
      axios.get('/api/v1/activity')
        .then(function(response) {
          vm.$set(vm,"activities",response.data);
          // vm.activities = response.data;
          console.log("loadActivities");
        });
    },
    //创建活动
    $createActivity(activity) {
      console.log("create new online activity");
      let vm=this.$root;
      axios.post('/api/v1/activity', activity)
        .then(function(response) {
          // console.log(response);
          vm.activities.push(response.data);
          // console.log(vm.$root.activities);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //更新所有活动
    $updateActivities() {
      console.log("update all ");
    },
    //更新单一活动
    $updateActivity(activity) {
      console.log("update");
      console.log(activity);
      let vm=this.$root;
      axios.put('/api/v1/activity', activity)
        .then(function(response) {
          // // console.log(response);
          // vm.activities.push(response.data);
          // // console.log(vm.$root.activities);
          console.log("xx");
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });

    },
    //删除活动
    $deleteActivity() {

    },

    $logActivities(){
      console.log(this.$root.activities);
    },


  },
  computed: {

  },
  components: {

  },
  watch: {
    // "$root.activities": {
    //   handler(newVal) {
    //     console.log("try update");
    //     if(new Date()-this.$root.lastUpdate>10000){
    //       this.$updateActivities();
    //       this.$root.lastUpdate=new Date();
    //     }
    //   },
    //   deep: true,
    //   immediate: true,
    // },
  },
};
</script>
