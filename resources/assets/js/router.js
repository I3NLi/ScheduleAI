import Vue from 'vue'
import Router from 'vue-router'

import thing from './components/thing/thing';
import ThingNavBar from './components/thing/navbar/navbar';
import ThingList from './components/thing/missionlist/missionlist';
import MissionCreator from './components/thing/mission/creator/main';
import MissionEditor from './components/thing/mission/editor/main';
import MissionViewer from './components/thing/mission/viewer/main';

import contact from './components/contact/contact';
import calendar from './components/calendar/calendar';
import organization from './components/organization/organization';

Vue.use(Router)

export default new Router({
  // hashbang: false,
  history: true,
  saveScrollPosition: true,
  root: '/home',
  routes: [{
      alias: '/',
      path: '/calendar',
      name: 'calendar',
      component: calendar,
    },

    // {
    //   path:'/thing/',
    //   redirect: '/b'
    // },
    {
      alias: [],
      /*
      @view 手机模式下那个界面显示在前
      @id mission的id
      @mode list的默认筛选
       */
      path: '/thing/:view?/:mode?/:lid?',
      name: 'thing',
      component: thing,
      props: true,
      children: [{
          path: 'creator/:id',
          name:"thing_creator",
          component: MissionCreator,
          props: true,
        },
        {
          path: 'editor/:id',
          name:"thing_editor",
          component: MissionEditor,
          props: true,
        },
        {
          path: 'viewer/:id',
          name:"thing_viewer",
          component: MissionViewer,
          props: true,
        },
      ],
      meta: {
        keepAlive: false, //此组件不需要被缓存
      }
    },
    // {
    //   path: '/thing',
    //   name: 'thing',
    //   component: thing,
    //   // children: [{
    //   //     path: 'creator/:id',
    //   //     component: MissionCreator,
    //   //   },
    //   //   {
    //   //     path: 'editor/:id',
    //   //     component: MissionEditor,
    //   //   },
    //   //   {
    //   //     path: 'viewer/:id',
    //   //     component: MissionViewer,
    //   //   },
    //   // ],
    //   //
    // },
    {
      path: '/organization',
      name: 'organization',
      component: organization,
    },
    {
      path: '/contact',
      name: 'contact',
      component: contact,
    },
  ]
})
