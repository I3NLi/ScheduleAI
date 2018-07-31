<template>
  <div class='c_list'>
    <Menu mode="horizontal" theme="primary" active-name="1" @on-select="change_mode" >
      <MenuItem name="0" >
        <Icon type="clock" ></Icon>
      </MenuItem>
      <MenuItem name="1" >
        <Icon type="ios-person" size='16px' ></Icon>
      </MenuItem>
    </Menu>


      <Menu  v-show='mode==1' theme="dark" active-name="1-2" :open-names="[0,1,2]" class='fullheight'>
        <Submenu v-for='(group, index1) in data':key="index1" :name='index1' >
          <template slot="title" >
            <Icon type="ios-paper"></Icon>
            {{group.title}}
          </template>
          <MenuItem v-for='(user,index2) in group.children'
          :name='index1+"-"+index2'
          :key="index2">
          {{user.title}}
        </MenuItem>
      </Submenu>
    </Menu>

  <Menu v-show='mode==0' theme="dark" active-name="1-2" :open-names="[0,1,2]">
      <MenuItem v-for='(user,index) in sorted'
      :name='index'
      :key="index">
      {{user.title}}
    </MenuItem>
</Menu>

</div>
<!-- <button @click='sorted()' >xxx</button> -->
</div>

</template>

<script>
export default {
  name: 'list',
  data() {
    return {
      mode:0,//0:最后顺序 1:排序 2:待定..
      data: [
        {
          title: '联系人',
          children: [
            {
              title: 'iView => + (添加好友)',
              count: 10000,

            },
            {
              title: 'iView UI => - (删除联系人)',
              count: 10600,

            }
          ]
        },
        {
          title: '临时群',
          children: [
            {
              title: 'iView UI 有多好 => group (分组)',
              count: 60100,

            },
            {
              title: 'iView 是啥 => Gou Xue',
              count: 30010,

            }
          ]
        },
        {
          title: '组织',
          children: [
            {
              title: 'iView 是一个设计语言 => Search (搜索，筛选)',
              count: 100000,

            }
          ]
        }
      ]
    };
  },
  computed:{
    sorted() {
      console.log('sortedData');
      let sortedData=new Array;
      //合并数组
      this.data.forEach(function (value){
        console.log(value);
        console.log(sortedData=sortedData.concat(value.children));
      });
      //查找最后修改
      // this.data.forEach(function (value){
      //   console.log(value);
      //   console.log(sortedData=sortedData.concat(value.children));
      // });
      return sortedData;
    },
  },
  methods:{
    change_mode(name){
      console.log(name);
      this.mode=name
    }
  },

};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped>
.demo-auto-complete-item{
  padding: 4px 0;
  border-bottom: 1px solid #F6F6F6;
}
.demo-auto-complete-group{
  font-size: 12px;
  padding: 4px 6px;
}
.demo-auto-complete-group span{
  color: #666;
  font-weight: bold;
}
.demo-auto-complete-group a{
  float: right;
}
.demo-auto-complete-count{
  float: right;
  color: #999;
}
.demo-auto-complete-more{
  display: block;
  margin: 0 auto;
  padding: 4px;
  text-align: center;
  font-size: 12px;
}

#c_list,.ivu-menu.ivu-menu-vertical{
    height:calc(100% - 60px);
}
</style>
