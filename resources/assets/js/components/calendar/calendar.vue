<template>
  <div class="content">
    <center>
      <br/>
      <ButtonGroup>
        <Button v-on:click="mode='day'">Day</Button>
        <Button disabled>Week</Button>
        <Button v-on:click="mode='month'">Month</Button>
        <Button disabled>Year</Button>
      </ButtonGroup>
    </center>

    <component :is="mode" class="full"/>

  </div>
</div>

</template>

<script>
// import month from "vue-fullcalendar";
import month from "./month/month";
import day from "./day/day";

export default {
  name: 'HelloWorld',
  data() {
    return {
      mode:"day",
    };
  },
  components:{
    month,
    day
  },
  computed:{

  }
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped>
.navbar{
  margin-bottom: 0px;
}
ButtonGroup{

}
component{
  height:100%
}
/*.navbar-default .navbar-nav{
text-align: center;
float: none;
}

.navbar-default .navbar-nav li{
display: inline-block;
float: none;
}*/
table{
  width: 100%;
  height: 52px;
  /*border: 1px solid;*/
  background: #bbb;
}
tr{
  text-align: center;
}
td{
  /*width: 33.3%;*/
}
.center{
  text-align: center;
}
.right{
  float: right;
}
#calendar{
  height: 100%;
}
.content{height:calc(100% - 52px);}
</style>
