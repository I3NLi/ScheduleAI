<!--

-->

<template>
  <div class="tempusers">
    <h1 >All tempusers:</h1>
    <ul>
      <li v-for="user in users">
        User: {{user.name}}, Email: {{user.email}}
      </li>
    </ul>
  </div>
</template>

<script>
// import navbar from './navbar/navbar';


export default {
  name: 'tempusers',
  props:{
    // xxx:{
    //   type:String,
    //   default:'navbar',
    // },
  },
  data() {

    return {
      users:[],
    }
  },
  computed: {

  },
  methods: {

  },
  // lifecycle hook plug into certain points in the rendering of the component
  created: function() {
    console.log('started');
    let vm = this;
    window.axios.get('https://jsonplaceholder.typicode.com/users')
      .then(function(response){
        vm.users = response.data;
      })
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
