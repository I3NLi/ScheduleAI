/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue';

import iView from 'iview';
import 'iview/dist/styles/iview.css';
// import "bootstrap-sass";
import Vuebar from 'vuebar';
import Vuerouter from 'vue-router';
import VueI18n from 'vue-i18n'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import 'weui/dist/style/weui.min.css';

import router from './router.js';
import store from './store';

Vue.config.productionTip = true;
Vue.config.onlineStorage = true;

Vue.use(MuseUI);
Vue.use(Vuebar);
Vue.use(iView);

import offlineActivityController from './mixins/offlineActivityController';
import onlineActivityController from './mixins/onlineActivityController';


Vue.config.onlineStorage?Vue.mixin(onlineActivityController):Vue.mixin(offlineActivityController);

/*
i18n 语言编码使用 RFC 3066 标准 {ISO 639-1}/{ISO 3166-1}

参考
http://www.i18nguy.com/unicode/language-identifiers.html
https://zh.wikipedia.org/wiki/ISO_639-1
https://zh.wikipedia.org/wiki/ISO_3166-1

使用:
en_US
zh-CN
de-DE
*/
Vue.use(VueI18n);


import App from './App.vue';

const i18n = new VueI18n({ //此处定义全局词典
  locale: 'en_US',
  messages: {
    "en_US": {
      // "hello": "hello world!"
    },
    "zh-CN": {
      // ...
    }
  }
})


//根据activity中的fid，组成嵌套关系
function buildTree(list) {
  // console.log(list);
  for (let m = 0; m < list.length; m++) {
    for (let n = 0; n < list.length; n++) {
      if (list[n] != null && list[m] != null) {
        let tmp = find_position(list[m], list[n]);
        if (tmp != false) {
          list[n] = tmp;
          list[m] = null;
          break;
        }
      }
    }
  }

  let result = [];
  for (let m = 0; m < list.length; m++) {
    if (list[m] != null) {
      result.push(list[m]);
    }
  }
  return result;
}
/*buildlist 递归部分*/
function find_position(activity, activitytree) {
  if (activitytree.id == activity.parent_id) {
    if (activitytree.children != undefined) {
      activitytree.children.push(activity);
    } else {
      activitytree.children = [activity];
    }
    return activitytree;
  }
  if (activitytree.children != undefined) {
    for (let i = 0; i < activitytree.children.length; i++) {
      let tmp = find_position(activity, activitytree.children[i]);
      if (tmp != false) {
        activitytree.children[i] = tmp;
        return activitytree;
      }
    }
  }
  return false;
}
/*获取一个list中所有节点的深度*/
function treeHeightList(activityTreeList) {
  for (let i = 0; i < activityTreeList.length; i++) {
    treeHeight(activityTreeList[i]);
  }
  return activityTreeList;
}
/*
获取一个节点的深度
 */
function treeHeight(activityTreeNode) {
  let result = 0;
  //console.log(activityTreeNode.children);
  if (activityTreeNode.children != undefined) {
    //console.log(activityTreeNode.children.length);
    for (let i = 0; i < activityTreeNode.children.length; i++) {
      let tmp = treeHeight(activityTreeNode.children[i])
      if (tmp > result)
        result = tmp;
    }
  }
  result++;
  activityTreeNode['height'] = result;
  return result;
}
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


const app = new Vue({
  el: '#app',
  name: 'appjs',
  template: '<App />',
  store,
  router,
  i18n,
  components: {
    App
  },
  data() {
    return {
      spinShow: false,
      settings: {
        usingLocalBus: true,
      },
      activities: [],
    }
  },
  methods: {
  },
  computed: {
    activitiesTree() {
      let result={};
      if (this.activities) {
        result=buildTree(this.activities);
        treeHeightList(result);
      }
      console.log("tree");
      console.log(result);
      return result;
    }
  },
  mounted() {
    this.$loadActivities();
  },

});
