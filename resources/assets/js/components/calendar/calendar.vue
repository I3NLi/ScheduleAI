<template>
<div class="content" id="calendar">
  <router-view class="full"></router-view>
  <!-- <component :is="mode" class="full"/> -->
</div>
</div>
</template>

<script>

export default {
  name: 'calendar',
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  margin-bottom: 0px;
}

ButtonGroup {}

component {
  height: 100%
}

/*.navbar-default .navbar-nav{
text-align: center;
float: none;
}

.navbar-default .navbar-nav li{
display: inline-block;
float: none;
}*/

table {
  width: 100%;
  height: 52px;
  /*border: 1px solid;*/
  background: #bbb;
}

tr {
  text-align: center;
}

td {
  /*width: 33.3%;*/
}

.center {
  text-align: center;
}

.right {
  float: right;
}

#calendar {
  height: 100%;
}

.content {
  height: calc(100% - 52px);
}
</style>
