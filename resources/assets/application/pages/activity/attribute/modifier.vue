<script>

import builder from '../builder';
export default {
  name: 'activity-modifier',
  mixins:[builder],
  props:{
    id:{
      type:[String,Integer],
      require:true,
    }
  }
  data() {
    let form;
    for(let activityIndex in this.$root.activities){
      if(this.$root.activities[activityIndex].id==this.id){
        form=this.$root.activities[activityIndex];
        break;
      }
    }
    return{
      form,
    }
  },
  methods: {

  }
  },
  components: {

  }
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped>
.activity-container{
  overflow: scroll;
}
.mu-demo-form {
  /* background-color: #eee; */
  padding: 16px;
}
.tags{
  width: 100%;
  border:none;
  border-bottom-width:1px;
  border-bottom-style: solid;
  border-bottom-color: #ccc;
}
.tags:active{
  border-bottom-color:#2196f3;;
}
</style>
