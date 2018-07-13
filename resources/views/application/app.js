
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

console.log(window.currentUser);
import Vue from 'vue';
import iView from 'iview';
// import "bootstrap-sass";
import Vuebar from 'vuebar';
import Vuerouter from 'vue-router';
import router from './router.js';

// import InputTag from 'vue-input-tag'

Vue.config.productionTip = true;

import 'iview/dist/styles/iview.css';


Vue.use(Vuebar);
Vue.use(iView);


import App from './App.vue';
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


const app = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
});