
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
import 'iview/dist/styles/iview.css';

console.log(window.currentUser);
import Vue from 'vue';
import iView from 'iview';
// import "bootstrap-sass";
import Vuebar from 'vuebar';
import Vuerouter from 'vue-router';
import router from './router.js';
import VueI18n from 'vue-i18n'

// import InputTag from 'vue-input-tag'

Vue.config.productionTip = true;

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
  locale: 'zh-CN',
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
    el: '#app',
    name:'appjs',
    template: '<App/>',
    router,
    i18n,
    components: { App },
});
