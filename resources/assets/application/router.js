import Vue from 'vue'
import Router from 'vue-router'

import activity from './components/activity/creator-museui';
// import ThingNavBar from './components/thing/navbar/navbar';
// import ThingList from './components/thing/missionlist/missionlist';
// import MissionCreator from './components/thing/mission/creator/main';
// import MissionEditor from './components/thing/mission/editor/main';
// import MissionViewer from './components/thing/mission/viewer/main';
//
// import contact from './components/contact/contact';
// import tempusers from './components/contact/tempusers/tempusers';

import calendar from './components/calendar/calendar';
import calendarDay from './components/calendar/day/day';
import calendarMonth from './components/calendar/month/month';
//
// import organization from './components/organization/organization';

Vue.use(Router)

export default new Router({
  // hashbang: false,
  history: true,
  saveScrollPosition: true,
  root: '/workspace',
  routes: [
    {
      alias: '/',
      path: '/activity',
      name: 'Create New Activity',
      component: activity,
    },
    {
      // alias: '/',
      path: '/calendar',
      name: 'Calendar',
      redirect: '/calendar/day',
      component: calendar,
      children: [{
          alias: ['/calendar'],
          path: 'day',
          name:"Calendar Day",
          component: calendarDay,
          props: (route) => ({
             view: route.query.view,
             tid: route.query.tid,
           }),
          children: [
            // {
            //   path: 'creator/:id',
            //   name:"calendar_day_creator",
            //   component: MissionCreator,
            //   props: true,
            // },
            // {
            //   path: 'editor/:id',
            //   name:"calendar_day_editor",
            //   component: MissionEditor,
            //   props: true,
            // },

            // {
            //   path: 'viewer',
            //   name:"calendar_day_viewer",
            //   component: MissionViewer,
            //   props: (route) => ({
            //      id: route.query.tid,
            //    }),
            //   meta: {
            //     keepAlive: false, //此组件不需要被缓存
            //   }
            // },
          ],
        },
        {
          path: 'month',
          name:"calendar_month",
          component: calendarMonth,
          props: true,
          // children: [{
          //     path: 'creator/:id',
          //     name:"calendar_month_creator",
          //     component: MissionCreator,
          //     props: true,
          //   },
          //   {
          //     path: 'editor/:id',
          //     name:"calendar_month_editor",
          //     component: MissionEditor,
          //     props: true,
          //   },
          //   {
          //     path: 'viewer/:id',
          //     name:"calendar_month_viewer",
          //     component: MissionViewer,
          //     props: true,
          //   },
          // ],
        },
      ],
    },

    // {
    //   path:'/thing/',
    //   redirect: '/b'
    // },
    // {
    //   /*
    //   @view 手机模式下哪个界面显示在前
    //   @id mission的id
    //   @mode list的默认筛选
    //    */
    //   path: '/thing',
    //   name: 'thing',
    //   redirect: '/thing/creator',
    //   component: thing,
    //   props: (route) => ({
    //      view: route.query.view,
    //      mode: route.query.mode,
    //      lid: route.query.lid,
    //    }),
    //   children: [{
    //       // alias:"",
    //       path: 'creator',
    //       name:"thing_creator",
    //       component: MissionCreator,
    //       props: (route) => ({
    //          id: route.query.tid,
    //          Tactive: route.query.Tactive,
    //        }),
    //     },
    //     {
    //       path: 'editor',
    //       name:"thing_editor",
    //       component: MissionEditor,
    //       props: (route) => ({
    //          id: route.query.tid,
    //          Tactive: route.query.Tactive,
    //          topic:route.query.topic,
    //        }),
    //     },
    //     {
    //       path: 'viewer',
    //       name:"thing_viewer",
    //       component: MissionViewer,
    //       props: (route) => ({
    //          id: route.query.tid,
    //          Tactive: route.query.Tactive,
    //          topic:route.query.topic,
    //        }),
    //     },
    //   ],
    //   meta: {
    //     keepAlive: false, //此组件不需要被缓存
    //   }
    // },
    // // {
    // //   path: '/thing',
    // //   name: 'thing',
    // //   component: thing,
    // //   // children: [{
    // //   //     path: 'creator/:id',
    // //   //     component: MissionCreator,
    // //   //   },
    // //   //   {
    // //   //     path: 'editor/:id',
    // //   //     component: MissionEditor,
    // //   //   },
    // //   //   {
    // //   //     path: 'viewer/:id',
    // //   //     component: MissionViewer,
    // //   //   },
    // //   // ],
    // //   //
    // // },
    // {
    //   path: '/organization',
    //   name: 'organization',
    //   component: organization,
    // },
    // {
    //   path: '/contact',
    //   name: 'contact',
    //   component: contact,
    // },
    // {
    //   path: '/tempusers',
    //   name: 'tempusers',
    //   component: tempusers,
    // }
  ]
})
