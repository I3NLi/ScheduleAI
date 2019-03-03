import Vue from 'vue'
import Router from 'vue-router'

import activity from './pages/activity/main';
import activityBuilder from './pages/activity/attribute/builder';
import activityNavbar from './pages/activity/navbar/navbar'
// import ThingNavBar from './components/activity/navbar/navbar';
// import ThingList from './components/activity/missionlist/missionlist';
// import MissionCreator from './components/activity/mission/creator/main';
// import MissionEditor from './components/activity/mission/editor/main';
// import MissionViewer from './components/activity/mission/viewer/main';
//
// import contact from './components/contact/contact';
// import tempusers from './components/contact/tempusers/tempusers';

import calendar from './pages/calendar/calendar';
import calendarDay from './pages/calendar/day/day';
import calendarWeek from './pages/calendar/day0/main';
import calendarMonth from './pages/calendar/month/month';

import setting from './pages/settings/setting';
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
      path: '/',
      redirect: '/calendar'
    },
    {
      // alias: '/',
      path: '/activity',
      meta: {title:'Activity', },
      name: 'Activity',
      components: {
        default:activity,
        drawer:activityNavbar,
      },
    },
    {
      path: '/activity/new',
      meta: {title:'Activity', },
      name: 'Activity: new',
      components: {
        default:activityBuilder,
        drawer:activityNavbar,
      }
    },
    {
      path: '/calendar',
      meta: {title:'Calendar', },
      name: 'Calendar',
      redirect: '/calendar/day',
      component: calendar,
      children: [
        {
          alias: ['/calendar'],
          path: 'day',
          name:"Calendar: Day",
          meta: {
            title:'Calendar: Day',
          },
          component: calendarDay,
          props: (route) => ({
             view: route.query.view,
             tid: route.query.tid,
           }),
          children: [
          ],
        },
        {
          path: 'week',
          name:"Calendar: Week",
          meta: {
            title:'Calendar: Week',
          },
          component: calendarWeek,
          props: (route) => ({
           }),
          children: [
          ],
        },
      ],
    },

    // {
    //   path:'/activity/',
    //   redirect: '/b'
    // },
    // {
    //   /*
    //   @view 手机模式下哪个界面显示在前
    //   @id mission的id
    //   @mode list的默认筛选
    //    */
    //   path: '/activity',
    //   name: 'activity',
    //   redirect: '/activity/creator',
    //   component: activity,
    //   props: (route) => ({
    //      view: route.query.view,
    //      mode: route.query.mode,
    //      lid: route.query.lid,
    //    }),
    //   children: [{
    //       // alias:"",
    //       path: 'creator',
    //       name:"activity_creator",
    //       component: MissionCreator,
    //       props: (route) => ({
    //          id: route.query.tid,
    //          Tactive: route.query.Tactive,
    //        }),
    //     },
    //     {
    //       path: 'editor',
    //       name:"activity_editor",
    //       component: MissionEditor,
    //       props: (route) => ({
    //          id: route.query.tid,
    //          Tactive: route.query.Tactive,
    //          topic:route.query.topic,
    //        }),
    //     },
    //     {
    //       path: 'viewer',
    //       name:"activity_viewer",
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
    // //   path: '/activity',
    // //   name: 'activity',
    // //   component: activity,
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
    {
      path: '/settings',
      meta: {title:'Settings', },
      name: 'Settings',
      components: {
        default:setting,
      },
    },
  ]
})
