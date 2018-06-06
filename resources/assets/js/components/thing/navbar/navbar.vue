<template>
  <Menu :theme="'dark'" class="full" active-name="active" @on-select="setMode">
     <MenuGroup title="常规">
      <MenuItem name="0-1">
        <Icon type="search"></Icon>
        查找任务
      </MenuItem>
      <MenuItem name="TODO">
        <Icon type="compose"></Icon>
        待完成事件
      </MenuItem>
      <MenuItem name="INVITED">
        <Icon type="archive"></Icon>
        待接受事件
      </MenuItem>
      <MenuItem name="DELETED">
        <Icon type="ios-trash-outline"></Icon>
        已删除事件
      </MenuItem>
      <MenuItem name="ALL">
        <Icon type="clipboard"></Icon>
        全部事件
      </MenuItem>
      <MenuItem name="0-6">
        <Icon type="ios-copy-outline"></Icon>
        事件模板管理
      </MenuItem>
    </MenuGroup>
    <Submenu name="1">
      <template slot="title">
        <Icon type="ios-pricetag-outline"></Icon>
        标签
      </template>
      <MenuItem name="1-1">文章管理</MenuItem>
      <MenuItem name="1-2">评论管理</MenuItem>
      <MenuItem name="1-3">举报管理</MenuItem>
    </Submenu>
    <Submenu name="2">
      <template slot="title">
        <Icon type="ios-color-wand-outline"></Icon>
        自定义
      </template>
      <MenuItem name="2-1">新增用户</MenuItem>
      <MenuItem name="2-2">活跃用户</MenuItem>
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
      default:[],
      active:String,
    }
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    setMode:function (mode){
       window.app.thing.missionlist_mode=mode;
       console.log(mode);
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
