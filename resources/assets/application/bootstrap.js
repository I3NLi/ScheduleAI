window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */
 try {
   window.$ = window.jQuery = require('jquery');
   require('bootstrap-sass');
 } catch (e) {}
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
  $.ajaxSetup({
    global: true,
    headers: {
      'X-CSRF-TOKEN': token.content,
    }
  });
} else {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}
//axios 默认错误处理
axios.interceptors.response.use(
  function(response) {
    //对响应数据做些事
    return response;
  },
  function(error) {
    //请求错误时做些事
    console.log(error);
    switch (error.response.status) {
      case 403:
        // 未授权异常
        alert("系统拒绝：您没有访问权限。");
        break;

      case 404:
        alert("您访问的资源不存在。");
        break;

      case 401: //未授权
        // this.$Notice.error({
        //   title: 'Notification title',
        //   desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
        // });
        alert("登陆已过期，请重新登录");
        location.reload();
        break;
      default:
        return Promise.reject(error);
    };
  }
);

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key'
// });
//
// import Echo from 'laravel-echo'
//
// window.io = require('socket.io-client');
//
// window.Echo = new Echo({
//   broadcaster: 'socket.io',
//   host: "10.0.75.1" + ':6001'
// });
// // console.log(window.location.hostname);
//
// window.Echo.private('App.User.' + window.currentUser.id)
//   .listen('UserNotificationBroadcast', (e) => {
//     console.log("Channel: UserNotificationBroadcast");
//     console.log(e);
//   });
//
// window.Echo.channel('news')
//   .listen('News', (e) => {
//     console.log(e);
//   });

setInterval(function(){
        window.scrollTo(0,0);
   },500);
