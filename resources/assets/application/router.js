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
import calendarMonth from './pages/calendar/month/month';
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
      name: 'Activity: Root',
      components: {
        default:activity,
        drawer:activityNavbar,
      }
    },
    {
      path: '/activity/new',
      name: 'Activity: new',
      components: {
        default:activityBuilder,
        drawer:activityNavbar,
      }
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
          name:"Calendar: Day",
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
  ]
})
