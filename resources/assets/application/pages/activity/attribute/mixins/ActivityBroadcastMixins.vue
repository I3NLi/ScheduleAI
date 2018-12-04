<script>
export default {
  name: 'ActivityBroadcastMixins',
  data() {

  },
  methods: {
    // updateActivities(){
    //   this.$root.updateActivities();
    // }
    pushActivities(activity){
      this.$root.activities.push(activity);
    },
    pullActivities(activity){
      return this.$root.activities.pull();
    }
  },
  computed:{
    activities(){
      return this.$root.activities;
    }
  },
  components: {

  },
  watch:{

  }
};
</script>
