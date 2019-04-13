import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

import activity from './activity';

export default new Vuex.Store({
  modules:{
    activity,
  }
});
