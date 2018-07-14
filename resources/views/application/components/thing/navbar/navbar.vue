<template>

  <Menu :theme="'dark'" class="full" :active-name="active" @on-select="setMode" width="100%">
     <MenuGroup title="常规" class="mission-navbar-group">
      <MenuItem name="0-1">
        <Icon type="search"></Icon>
        <span class="option-name">查找任务</span>
      </MenuItem>
      <MenuItem name="todo">
        <Icon type="compose"></Icon>
        <span class="option-name">待完成事件</span>
      </MenuItem>
      <MenuItem name="invited">
        <Icon type="archive"></Icon>
        <span class="option-name">待接受事件</span>
      </MenuItem>
      <MenuItem name="deleted">
        <Icon type="ios-trash-outline"></Icon>
        <span class="option-name">已删除事件</span>
      </MenuItem>
      <MenuItem name="all">
        <Icon type="clipboard"></Icon>
        <span class="option-name">全部事件</span>
      </MenuItem>
      <MenuItem name="0-6">
        <Icon type="ios-copy-outline"></Icon>
        <span class="option-name">事件模板管理</span>
      </MenuItem>
    </MenuGroup>
    <Submenu name="1">
      <template slot="title">
        <Icon type="ios-pricetag-outline"></Icon>
        <span class="option-name">标签</span>
      </template>
      <MenuItem name="1-1"><span class="option-name">文章管理</span></MenuItem>
      <MenuItem name="1-2"><span class="option-name">评论管理</span></MenuItem>
      <MenuItem name="1-3"><span class="option-name">举报管理</span></MenuItem>
    </Submenu>
    <Submenu name="2">
      <template slot="title">
        <Icon type="ios-color-wand-outline"></Icon>
        <span class="option-name">自定义</span>
      </template>
      <MenuItem name="2-1"><span class="option-name">新增用户</span></MenuItem>
      <MenuItem name="2-2"><span class="option-name">活跃用户</span></MenuItem>
    </Submenu>
  </Menu>

</template>

<script>
/*
@file



*/


export default {
  name: 'navbar',
  template: '#navbar_main',
  props: {
    data:{
      type:[Object,Array],
      default:function (){return [];},
    },
    active:{
      type:String,
      default:'todo'},
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    setMode:function (mode){
      this.$router.push({ name: 'thing', query: { view:'list',id:'0',mode:mode.toLocaleLowerCase()}});
    }
  },
  watch:{
    // mode:function (newVal,oldVal){
    //   setMode(newVal);
    //
    //
    // }


  }
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped >

</style>

<style>


</style>
