<template>

  <Menu :theme="'dark'" class="full" :active-name="active" @on-select="setMode" width="100%">
     <MenuGroup title="常规" class="mission-navbar-group">
      <MenuItem name="0-1">
        <Icon type="ios-search"></Icon>
        <span class="option-name">{{$t('search')}}</span>
      </MenuItem>
      <MenuItem name="todo">
        <Icon type="ios-list-box"></Icon>
        <span class="option-name">{{$t('toDos')}}</span>
      </MenuItem>
      <MenuItem name="invited">
        <Icon type="md-archive"></Icon>
        <span class="option-name">{{$t('collectionBox')}}</span>
      </MenuItem>
      <MenuItem name="deleted">
        <Icon type="ios-trash-outline"></Icon>
        <span class="option-name">{{$t('deleted')}}</span>
      </MenuItem>
      <MenuItem name="all">
        <Icon type="md-clipboard"></Icon>
        <span class="option-name">{{$t('all')}}</span>
      </MenuItem>
      <MenuItem name="0-6">
        <Icon type="ios-copy-outline"></Icon>
        <span class="option-name">{{$t('templateManagement')}}</span>
      </MenuItem>
    </MenuGroup>
    <Submenu name="1">
      <template slot="title">
        <Icon type="ios-pricetag-outline"></Icon>
        <span class="option-name">{{$t('tags')}}</span>
      </template>
      <MenuItem name="1-1"><span class="option-name">文章管理</span></MenuItem>
      <MenuItem name="1-2"><span class="option-name">评论管理</span></MenuItem>
      <MenuItem name="1-3"><span class="option-name">举报管理</span></MenuItem>
    </Submenu>
    <Submenu name="2">
      <template slot="title">
        <Icon type="ios-color-wand-outline"></Icon>
        <span class="option-name">{{$t('customize')}}</span>
      </template>
      <MenuItem name="2-1"><span class="option-name">新增用户</span></MenuItem>
      <MenuItem name="2-2"><span class="option-name">活跃用户</span></MenuItem>
    </Submenu>
  </Menu>

</template>
<i18n>
{
  "en_US": {
    "search": "Search",
    "toDos":"To Do",
    "collectionBox":"Collection Box",
    "deleted":"Deleted",
    "all":"All",
    "templateManagement":"Template Management",
    "tags": "Tags",
    "customize":"Customize"
    },
  "zh-CN": {
    "search": "查找任务",
    "toDos":"待完成事件",
    "collectionBox":"待接受事件",
    "deleted":"已删除事件",
    "all":"全部事件",
    "templateManagement":"事件模板管理",
    "tags": "标签",
    "customize":"自定义"
  }
}
</i18n>
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
      this.$router.push({ name: 'activity', query: { view:'list',id:'0',mode:mode.toLocaleLowerCase()}});
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
