
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue';
import iView from 'iview';
// import "bootstrap-sass";
import Vuebar from 'vuebar';
// import InputTag from 'vue-input-tag'

Vue.config.productionTip = false;

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
    template: '<App/>',
    components: { App },
});
console.log("start");
