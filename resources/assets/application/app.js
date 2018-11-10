
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
import router from './router.js';
import VueI18n from 'vue-i18n'

import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import 'weui/dist/style/weui.min.css';

Vue.config.productionTip = true;

Vue.use(MuseUI);
Vue.use(Vuebar);
Vue.use(iView);

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

const i18n = new VueI18n({//此处定义全局词典
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

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


const app = new Vue({
    data(){
      return {
        /*
        因为activities可能会非常大，如果所有组件都是用watch会对效率造成很严重的影响
        所以使用主动通知的方式告知其他程序更改
        */
        activities:[],
        activitiesUpdate:true,
      }
    },
    methods:{
      /*
      用于通知其他用到tivities的组件更新视图*/
      updateActivities(){
        this.activitiesUpdate=!this.activitiesUpdate;
      }
    },
    el: '#app',
    name:'appjs',
    template: '<App />',
    router,
    i18n,
    components: { App },
});
