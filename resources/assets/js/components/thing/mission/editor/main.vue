<template>
<div id="editor">
  <Tabs value="nav-mission" type="card">
    <TabPane v-for="(module,key) in modules" :key="key" :name="key" :label="key">
      <input type="text" id="title" v-model="modules.Attribute.title" placeholder="Title" />
      <hr/> ID: #{{data._id}}
      <component :is="key" :data="module" :editor="editor" :permissions="modules.Permissions" :fulldata="data" />
    </TabPane>
    <Button type="ghost" @click="toViewer" size="small" slot="extra">view</Button>
  </Tabs>
  <hr/>

  <contact slot="content" :data="data.Contact" :permissions="modules.Permissions" />
  <br/>
  <Button type="success" long @click="update()">SUBMIT</Button>
  <br/>
  <br/>
<br/>
<br/>
  <div class='c_input'>
    <c-input :data='this.data.Contact' :ziel='ziel' />
  </div>

  <Spin size="large" fix v-if="spinShow" />

</div>
</template>

<script>
import Attribute from './attribute/main';
// import repeat from './repeat/main';
import Mission from '../missionComponent/Editor/Editor';
//import File from '../file/main';
// import Database from './database/main';
import Contact from '../../../contact/panel/panel';
import cInput from '../../../contact/input/input'
import Permissions from './permissions/main'

function in_array(string, array) {
  for (let item in array) {
    if (array[item] == string) {
      return true;
    }
  }
  return false;
}

export default {
  name: 'editor',
  props: {
    id: String,
  },
  data() {
    return {
      data:{},
      editor: this,
      spinShow: true,
      shieldModules:['Contact'],
    };
  },
  created: function() {
    console.log(this.id);
    this.get_data();
  },
  computed: {
    modules: function() {
      let result = {};
      for (let module in this.data) {
        if (typeof this.data[module] == "array" || typeof this.data[module] == "object") {
          // console.log(module+":"+typeof( this.data[module]));
          if (!in_array(module, this.data.Modules)) {
            // console.log(module+":false");
            continue;
          }
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
    toViewer(){
      this.$router.push({
        name: 'thing_viewer',
        params: {id:this.id},
       });
    },
    get_data() {
      console.log("getdata"+this.id);
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
          vm.data = result;
          vm.ziel={
            type: "mission",
            id: vm.data._id,
          },
          vm.spinShow = false;
          console.log(vm);
        },
        error: function(xhr, textStatus) {},
        complete: function() {}
      });
    },
    update(modules, list_fresh = false, message = false) {
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
          if (list_fresh) {
            console.log("thinglist 刷新 in thing/mission/editor/main @update");
            window.app.thing.activeThingNode.$parent.refresh(vm.data._id);
          }
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
    change_title() {
      window.focus();
      return false;
    }
  },
  components: {
    Attribute,
    Mission,
    Contact,
    cInput,
    Permissions,
    //File,
  },
  watch: {
    "data.Attribute.title": function() {
      let modules = ["Attribute"];
      this.update(modules, true, true);
    },
    'data.Mission': {
      handler: function(val, oldVal) {
        let modules = ["Mission"];
        console.log(val);
        this.update(modules, false, "Mission");
      },
      deep: true
    },
    'data.Permissions.owner': {
      handler: function(val, oldVal) {
        let modules = ["Permissions"];
        console.log(val);
        this.update(modules, false, "Permissions");
      },
      deep: true
    },



  }
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped >
/*nav{ height: 42px; border: 1px red; }*/

.c_input {
  position: fixed;
  bottom: 0px;
}

#title {
  width: 100%;
  font-size: 24px;
}
</style>
