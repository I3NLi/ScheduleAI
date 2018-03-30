<template>
    <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
      <div class="layout-logo-left"></div>
      <MenuItem name="0" >
        <Icon type="" ></Icon>
        查找组织
      </MenuItem>
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-navigate"></Icon>
          我参与的
        </template>
        <MenuItem name="1-1">Option 1</MenuItem>
        <MenuItem name="1-2">Option 2</MenuItem>
        <MenuItem name="1-3">Option 3</MenuItem>
      </Submenu>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-keypad"></Icon>
          收藏的
        </template>
        <MenuItem name="2-1">Option 1</MenuItem>
        <MenuItem name="2-2">Option 2</MenuItem>
      </Submenu>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-analytics"></Icon>
          最近浏览
        </template>
        <MenuItem name="3-1">Option 1</MenuItem>
        <MenuItem name="3-2">Option 2</MenuItem>
      </Submenu>
    </Menu>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ivu-menu.ivu-menu-vertical{
    height:100%;
}
</style>
