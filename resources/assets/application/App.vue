<template>
<div id='app' class="app">
  <mu-appbar style="width: 100%;" color="primary">
  <mu-button icon slot="left">
    <mu-icon value="menu"></mu-icon>
  </mu-button>
  ScheduleAI
  <mu-menu slot="right">
    <mu-button flat>{{$t('Settings')}}</mu-button>
    <mu-list slot="content">
      <mu-list-item button>
        <mu-list-item-content>
          <mu-list-item-title>English</mu-list-item-title>
        </mu-list-item-content>
      </mu-list-item>
      <mu-list-item button>
        <mu-list-item-content>
          <mu-list-item-title>Deutsch</mu-list-item-title>
        </mu-list-item-content>
      </mu-list-item>
      <mu-list-item button>
        <mu-list-item-content>
          <mu-list-item-title>中文</mu-list-item-title>
        </mu-list-item-content>
      </mu-list-item>

      <mu-divider inset></mu-divider>

      <mu-list-item button @click="logout()">
        <mu-list-item-content>
          <mu-list-item-title>Logout</mu-list-item-title>
        </mu-list-item-content>
      </mu-list-item>
    </mu-list>
  </mu-menu>
</mu-appbar>

  <keep-alive>
    <router-view class="content"></router-view>
  </keep-alive>


</div>
</template>

<!-- i18n 语言编码使用 RFC 3066 标准 {ISO 639-1}/{ISO 3166-1}

参考
http://www.i18nguy.com/unicode/language-identifiers.html
https://zh.wikipedia.org/wiki/ISO_639-1
https://zh.wikipedia.org/wiki/ISO_3166-1

使用:
en_US
zh-CN
de-DE

-->
<i18n>
{
  "en_US": {
    "Calendar": "Calendar",
    "Events":"Events",
    "Organization":"Organization",
    "Contact":"Contact",
    "Config":"Config",
    "Logout":"Logout",
    "Settings":"settings"
  },
  "zh-CN": {
    "Calendar": "日历",
    "Events":"事件",
    "Organization":"组织",
    "Contact":"联系人",
    "Config":"设置",
    "Logout":"注销",
    "Settings":"设置"
  }
}
</i18n>

<script>
export default {
  name: 'app',
  data() {

    return {

    };
  },
  methods: {
    setCurrentView(view) {
      // console.log(view);
      if (view == "logout") {//注销
        this.logout();
      } else if (view.indexOf('lang')==0){//修改语言
          this.$root.$i18n.locale = view.substr(5);
          console.log(this.$root.$i18n.locale);
      }
      else if (view != '#') {//跳转
        this.$router.push({
          name: view
        });
      }
      return false;
    },
    logout() {
      console.log("try logout");
      axios.post('/logout', {})
        .then(function(response) {
          location.reload();
          console.log("logout");
        })
        .catch(function(error) {
          console.log(error);
        });


    }
  },
  computed: {},
  components: {

  },



};
</script>

<style scoped>


/* 中等屏幕（桌面显示器，大于等于 992px） */

/* @media (min-width:993px)and (max-width: 1200px) { */

@media only screen and (min-width:992px) {

}

/* 小屏幕（平板，大于等于 768px） */

@media only screen and (max-width: 991px) and (min-width:768px) {

}

/* 超小屏幕（手机，小于 768px） */

@media only screen and (max-width: 767px) {

}
</style>

<!-- /* <style >
/* 中等屏幕（桌面显示器，大于等于 992px） */
/* @media (min-width:993px)and (max-width: 1200px) { */
@media only screen and (min-width:992px){

}
/* 小屏幕（平板，大于等于 768px） */
@media only screen and (max-width: 991px) and (min-width:768px) {

}

/* 超小屏幕（手机，小于 768px） */
@media only screen and (max-width: 767px) {

}

</style> */ -->


<style>


/*载入中*/

.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}

.demo-spin-container {
  display: inline-block;
  width: 200px;
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}

/*通用*/

.full {
  height: 100%;
  width: 100%;
}

.inline-block {
  display: inline-block;
  vertical-align: top;
}

.fullheight {
  height: 100%;
}


/*v-bar */

.v-bar-container {
  height: calc(100% - 4px);
  height: 100%;
}

.vb>.vb-dragger {
  z-index: 5;
  width: 12px;
  right: 0;
}

.vb>.vb-dragger>.vb-dragger-styler {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: rotate3d(0, 0, 0, 0);
  transform: rotate3d(0, 0, 0, 0);
  -webkit-transition: background-color 100ms ease-out,
  margin 100ms ease-out,
  height 100ms ease-out;
  transition: background-color 100ms ease-out,
  margin 100ms ease-out,
  height 100ms ease-out;
  background-color: rgba(48, 121, 244, .1);
  margin: 5px 5px 5px 0;
  border-radius: 20px;
  height: calc(100% - 10px);
  display: block;
}

.vb.vb-scrolling-phantom>.vb-dragger>.vb-dragger-styler {
  background-color: rgba(48, 121, 244, .3);
}

.vb>.vb-dragger:hover>.vb-dragger-styler {
  background-color: rgba(48, 121, 244, .5);
  margin: 0px;
  height: 100%;
}

.vb.vb-dragging>.vb-dragger>.vb-dragger-styler {
  background-color: rgba(48, 121, 244, .5);
  margin: 0px;
  height: 100%;
}

.vb.vb-dragging-phantom>.vb-dragger>.vb-dragger-styler {
  background-color: rgba(48, 121, 244, .5);
}
</style>
