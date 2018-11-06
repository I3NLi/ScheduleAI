<template>
<div class='c_list'>
  <div class="user">
    <img src="/images/face-1.jpg" class="user-profile-picture" />
    <span class="user-name">MockUserAdmin</span>
    <Dropdown placement="bottom-start">
      <Icon type="md-menu" size="24" color="#888" />
      <!-- <Button icon="ios-list-box"/> -->
      <DropdownMenu slot="list">
        <DropdownItem>
          <icon type="ios-add-circle" size='16' /> 添加好友
        </DropdownItem>
        <DropdownItem>
          <icon type="ios-chatbubbles" size='16' /> 创建聊天室
        </DropdownItem>
        <DropdownItem disabled>
          <icon type="ios-search" size='16' /> 其他
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>

  <i-input class="contact-search" v-model="filter" prefix="ios-search" placeholder="search" clearable width="auto" />

  <Tabs id="contact-tabs" type="card" value="contact">
    <TabPane label="" icon="ios-clock-outline" name="recent">
      <Menu theme="dark">
        <Badge :count="100">
          <MenuItem v-for='(user,index) in sortedByLastModify' :name='index' :key="index"> {{user.title}}
          </MenuItem>
          <!-- <a href="#" class="demo-badge"></a> -->
        </Badge>

      </Menu>
    </TabPane>

    <TabPane label="" icon="ios-person" name="contact">
      <Menu theme="dark">
        <Submenu v-for='(group, index1) in directContact' :key="index1" :name='index1'>
          <template slot="title">
                <!-- <Icon type="ios-paper"></Icon> -->
                {{group.title}}
              </template>
          <MenuItem v-for='(user,index2) in group.children' :name='index1+"-"+index2' :key="index2"> {{user.title}}
          </MenuItem>
        </Submenu>
      </Menu>
    </TabPane>

    <TabPane label="" icon="ios-people" name="group">
      <Menu theme="dark">
        <MenuItem v-for='(user,index) in gruppeContact' :name='index' :key="index"> {{user.title}}
        </MenuItem>
      </Menu>
    </TabPane>
  </Tabs>


</div>
<!-- <button @click='sorted()' >xxx</button> -->
</div>
</template>

<script>
export default {
  name: 'list',
  data() {
    return {
      filter: "", //过滤信息
      mode: 0, //0:最后顺序 1:排序 2:qunzu..
      directContact: [{
          title: 'Family',
          children: [{
              title: 'MockUser001',
              count: 10000,

            },
            {
              title: 'MockUser002',
              count: 10600,

            }
          ]
        },
        {
          title: 'Colleague',
          children: [{
              title: 'MockUser003',
              count: 60100,

            },
            {
              title: 'MockUser004',
              count: 30010,

            }
          ]
        },
        {
          title: 'Football',
          children: [{
            title: 'MockUser005',
            count: 100000,

          }]
        }
      ],
      gruppeContact: [{

      }],
    };
  },
  methods: {

  },
  computed: {
    sortedByLastModify: function() {
      //根据filter过滤
      //根据最后修该排序
    },
    sortedByDictionary() {
      //根据filter过滤
      //字典顺序排序
    },
    sorted() {
      console.log('sortedData');
      let sortedData = new Array;
      //合并数组
      this.data.forEach(function(value) {
        console.log(value);
        console.log(sortedData = sortedData.concat(value.children));
      });
      //查找最后修改
      // this.data.forEach(function (value){
      //   console.log(value);
      //   console.log(sortedData=sortedData.concat(value.children));
      // });
      return sortedData;
    },
  },
  methods: {},

};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped>
.demo-auto-complete-item {
  padding: 4px 0;
  border-bottom: 1px solid #F6F6F6;
}

.demo-auto-complete-group {
  font-size: 12px;
  padding: 4px 6px;
}

.demo-auto-complete-group span {
  color: #666;
  font-weight: bold;
}

.demo-auto-complete-group a {
  float: right;
}

.demo-auto-complete-count {
  float: right;
  color: #999;
}

.demo-auto-complete-more {
  display: block;
  margin: 0 auto;
  padding: 4px;
  text-align: center;
  font-size: 12px;
}

#c_list,
.ivu-menu.ivu-menu-vertical {
  height: calc(100% - 60px);
}


.user-profile-picture {
  width: 40px;
  height: 40px;
  display: inline-block;
  margin: 10px;
  border-width: thin;
}

.user-name {
  color: rgba(255, 255, 255, .7);
  font-size: 1.5em;
  display: inline-block;
  width: calc(100% - 105px);
}

.user {
  height: 60px;
}

.contact-search {
  width: calc(100% - 25px);
  /* margin: 0px auto 0px auto; */
  margin-left: 10px;
}
</style>
<style>
.contact-search>.ivu-input {
  background: #363e4f;
  color: #b5b4ae;
  border: 0px;
}

/* .contact-tabs > .ivu-tabs-card > .ivu-tabs-content {
    height: 120px;
    margin-top: -16px;
} */

/* .contact-tabs > .ivu-tabs-card > .ivu-tabs-content > .ivu-tabs-tabpane {
    background: #fff;
    padding: 16px;
} */

#contact-tabs {
  margin-top: 10px;
}

#contact-tabs>.ivu-tabs-bar {
  border-bottom: 0px;
  height: 30px;
  margin: 0px;
}


#contact-tabs>.ivu-tabs-bar .ivu-tabs-nav-container {
  height: 40px;
}

#contact-tabs>.ivu-tabs-bar .ivu-tabs-tab {
  background: #515a6e;
  border: 0px;
  height: 40px;
}

#contact-tabs>.ivu-tabs-bar .ivu-tabs-tab>.ivu-icon {
  color: white;
  font-size: 24px;
  border-radius: 4px;
  height: 40px;
}

#contact-tabs>.ivu-tabs-bar .ivu-tabs-tab-active>.ivu-icon {
  color: #0f0;
}
</style>
