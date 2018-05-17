
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
  function(response){
    //对响应数据做些事
    return response;
  },
  function(error){
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

      case 401://未授权
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

//ajax 默认错误处理
$(function(){
  //.ajaxError事件定位到document对象，文档内所有元素发生ajax请求异常，都将冒泡到document对象的ajaxError事件执行处理
  $(document).ajaxError(

    //所有ajax请求异常的统一处理函数，处理
    function(event,xhr,options,exc ){
      if(xhr.status == 'undefined'){
        return;
      }
      switch(xhr.status){
        case 403:
        // 未授权异常
        alert("系统拒绝：您没有访问权限。");
        break;

        case 404:
        alert("您访问的资源不存在。");
        break;

        case 401://未授权
        // this.$Notice.error({
        //   title: 'Notification title',
        //   desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
        // });
        alert("登陆已过期，请重新登录");
        location.reload();
        break;
      }
    }
  );
});
window.timeStamp=function timeStamp(secondTime) {
  let v="";
  if(secondTime<0){
    v="-";
    secondTime=-1*secondTime;
  }
  let time = parseInt(secondTime) + "秒";
  if (parseInt(secondTime) > 60) {
    let second = parseInt(secondTime) % 60;
    let min = parseInt(secondTime / 60);
    time = min + "分" + second + "秒";
    if (min > 60) {
      min = parseInt(secondTime / 60) % 60;
      let hour = parseInt(parseInt(secondTime / 60) / 60);
      time = hour + "小时" + min + "分" + second + "秒";
      if (hour > 24) {
        hour = parseInt(parseInt(secondTime / 60) / 60) % 24;
        let day = parseInt(parseInt(parseInt(secondTime / 60) / 60) / 24);
        time = day + "天" + hour + "小时" + min + "分" + second + "秒";
      }
    }
  }
  return v+time;
}

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
