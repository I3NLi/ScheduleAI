<template>
<div id="viewer">
  <div v-if="!isDataValid">
    Error: 找不到任务
  </div>


  <Tabs v-if="isDataValid" value="nav-mission" type="card" v-model="active">
    <TabPane v-for="(module,key) in modules" :key="key" :name="key.toLowerCase()" :label="key">
      <h2 id="title">{{modules.Attribute.title}}</h2>
      <hr/> ID: #{{data._id}}
      <!-- <Attribute :data="modules.Attribute"/> -->
      <component :is="key" :data="module" :permissions="modules.Permissions" />
    </TabPane>

    <TabPane name="topics" label="topics">
      <h2 id="title">{{modules.Attribute.title}}</h2>
      <hr/> ID: #{{data._id}}
      <!-- <Attribute :data="modules.Attribute"/> -->
      <topics/>
    </TabPane>

    <TabPane name="depend" label="depend">
      <h2 id="title">{{modules.Attribute.title}}</h2>
      <hr/> ID: #{{data._id}}
      <!-- <Attribute :data="modules.Attribute"/> -->
      <depend/>
    </TabPane>

    <TabPane name="analysis" label="analysis">
      <h2 id="title">{{modules.Attribute.title}}</h2>
      <hr/> ID: #{{data._id}}
      <!-- <Attribute :data="modules.Attribute"/> -->
      <topics/>
    </TabPane>

    <TabPane name="setting" label="setting">
      <h2 id="title">{{modules.Attribute.title}}</h2>
      <hr/> ID: #{{data._id}}
      <!-- <Attribute :data="modules.Attribute"/> -->
      <setting/>
    </TabPane>

    <Button type="ghost" @click="toEdit" size="small" slot="extra">edit</Button>
  </Tabs>
  <hr/>

  <contact slot="content" :data="data.Contact" :permissions="modules.Permissions" />

  <div class='c_input'>
    <c-input :data='this.data.Contact' :ziel='ziel' />
  </div>

  <br/>
  <br/>

  <Spin size="large" fix v-if="spinShow"></Spin>
</div>
</template>

<script>
import Attribute from './attribute/main';
import Mission from '../missionComponent/FormViewer/FormViewer';
import Contact from '../../../contact/panel/panel';
import cInput from '../../../contact/input/input';
import Permissions from './permissions/main';

import depend from '../components/depend/main';
import setting from '../components/setting/main';
import topics from '../components/topics/main';


function in_array(string, array) {
  for (let item in array) {
    if (array[item] == string) {
      return true;
    }
  }
  return false;
}

export default {
  name: 'viewer',
  props: {
    id: String,
    Tactive: {
      type: String,
      default: 'mission',
    }
  },
  data() {
    return {
      spinShow: true,
      data: {},
      ziel: {},
      shieldModules: ['Contact'],
      active: this.Tactive,
      isDataValid: true,
    };
  },
  computed: {
    modules: function() {
      // console.log("modules");
      // console.log(this.data);
      let result = {}; //结果容器
      for (let module in this.data) {
        if (typeof this.data[module] == "array" || typeof this.data[module] == "object") {
          // console.log(module+":"+typeof( this.data[module]));
          // 屏蔽未加载的模块
          if (!in_array(module, this.data.Modules)) {
            // console.log(module+":false");
            continue;
          }
          //屏蔽禁止加载的模块
          if (in_array(module, this.shieldModules)) {
            // console.log(module+":false");
            continue;
          }
          result[module] = this.data[module];
        }
        // console.log(result);
      }
      return result;
    },
  },
  methods: {
    toEdit() {
      this.$router.push({
        name: 'thing_editor',
        query: {
          view: 'mission',
          mode: 'todo',
          lid: this.data.Attribute.fatherId,
          tid: this.data._id
        },
      });
    },
    // create: function() {
    //   let vm = this;
    //   let data = {
    //     'data': vm.data
    //   }
    //   console.log("create");
    //   console.log(this.data);
    //   window.axios.post('/api/thing/create/' + vm.data.id, data)
    //     .then(function(response) {
    //       // console.log("response");
    //       // console.log(response);
    //       window.app.thing.activeThingNode.refresh();
    //       window.app.thing.thing_id = response._id;
    //       window.app.thing.currentView = "mission";
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    //
    // },
    get_data() {
      console.log("viewer:getdata(" + this.id + ")");
      this.spinShow = true;
      let vm = this;
      let result
      $.ajax({
        url: '/api/thing/get/' + vm.id,
        type: 'GET', //GET
        async: false, //或false,是否异步
        timeout: 5000, //超时时间
        dataType: 'json', //返回的数据格式：
        beforeSend: function(xhr) {},
        success: function(data, textStatus, jqXHR) {
          result = data[0];
          //检查结果合法性
          if (typeof result=="undefined") {
            vm.isDataValid = false;
          } else {
            vm.isDataValid = true;
            vm.data = result;
            vm.ziel = {
              type: "mission",
              id: vm.data._id,
            };
          }
          //设置绑定聊天组件

          vm.spinShow = false;
          //console.log(vm);
        },
        error: function(xhr, textStatus) {},
        complete: function() {}
      });
    },
    update(modules, list_fresh = false, message = false) {
      if(!this.isDataValid){
        return;
      }
      if (typeof modules != "undefined" || modules == [] || modules == null) {
        modules = [
          "Attribute",
          "Mission",
        ];
      }
      if (list_fresh !== true) {
        list_fresh = false;
      }
      // console.log(modules);
      let vm = this;
      let result = false;
      let data = {
        'data': vm.data,
        'modules': modules,
      }

      window.axios.post('/api/thing/update/' + vm.data._id, data)
        .then(function(response) {
          // if (list_fresh) {
          //   //console.log("thinglist 刷新 in thing/mission/editor/main @update");
          //   window.app.thing.activeThingNode.$parent.refresh(vm.data._id);
          // }
          if (message) {
            if (message === true) {
              vm.$Message.success('Update successful');
            } else {
              vm.$Message.success('Successful to update ' + message);
            }
          }
          result = true;
        })
        .catch(function(error) {
          console.log(error);
          if (message) {
            if (message === true) {
              vm.$Message.error('Update failed');
            } else {
              vm.$Message.error('Failed to update ' + message);
            }
          }

          result = false;
        });
      return result;
    },
  },
  created: function() {
    // console.log(this.id);
    this.get_data();
  },
  watch: {
    'data.Mission': {
      handler: function(val, oldVal) {
        let modules = ["Mission"];
        //console.log(val);
        this.update(modules, false, "Mission");
      },
      deep: true,
    },
    'id': {
      handler: function(val, oldVal) {
        this.get_data();
      },
    },
    'Tactive': {
      handler: function(val, oldVal) {
        this.active = val;
      },
    },

  },
  components: {
    Attribute,
    Mission,
    Contact,
    cInput,
    Permissions,
    depend,
    setting,
    topics,
    //File,
  },
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped >
/*nav{ height: 42px; border: 1px red; }*/

.c_input {
  position: fixed;
  bottom: 0px;
}
/* @media only screen and (min-width:768px) {
  .c_input {
    bottom: 0px;
    position: fixed;
  }
} */

@media only screen and (max-width:768px) {
  .c_input {
    bottom: 32px;
  }
}
</style>
