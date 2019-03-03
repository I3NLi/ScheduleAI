<template>
<div id='app' class="">
  <Menu mode="horizontal" :theme="'light'" class="top-navbar only-show-on-pc">
    <MenuItem name="calendar" to='/calendar'>
    <Icon type="md-calendar" />
    <span class="option-name">&nbsp&nbsp{{$t('Calendar')}}</span>
    </MenuItem>
    <MenuItem name="activity" to='/activity'>
    <Icon type="md-clipboard"  />
    <span class="option-name">&nbsp&nbsp{{$t('Activities')}}</span>
    </MenuItem>
    <MenuItem name="organization">
      <Icon type="ios-people" />
    <span class="option-name">&nbsp&nbsp{{$t('Organization')}}</span>
    </MenuItem>
    <MenuItem name="contact">
    <Icon type="md-chatboxes" />
    <span class="option-name">&nbsp&nbsp{{$t('Contact')}}</span>
    </MenuItem>

    <MenuItem name="config" class="only-show-on-mobile">
    <Icon type="ios-construct" />
    <span class="option-name">{{$t('Config')}}</span>
    </MenuItem>

    <Submenu name="Config" style="float:right" class="only-show-on-pc">
      <template slot="title">
        <Icon type="stats-bars"></Icon>
        <span class="option-name">{{$t('Config')}}</span>
      </template>

      <MenuGroup title="Language">
        <MenuItem name="lang_en_US" >English</MenuItem>
        <MenuItem name="lang_de-DE" >Deutsch</MenuItem>
        <MenuItem name="lang_zh-CN" >中文-简体</MenuItem>
      </MenuGroup>
      <MenuGroup title="System">
        <MenuItem name="settings">{{$t('Settings')}}</MenuItem>
        <MenuItem name="logout">{{$t('Logout')}}</MenuItem>
      </MenuGroup>
    </Submenu>

  </Menu>

  <mu-appbar color="teal" id="appbar" class="only-show-on-mobile">
    <mu-button icon slot="left" v-on:click="drawer=true">
      <mu-icon value="menu">
      </mu-icon>
    </mu-button>

    {{routeName}}

    <!-- <mu-list-item button>
         <mu-list-item-content>
           <mu-list-item-title>Menu Item 2</mu-list-item-title>
         </mu-list-item-content>
       </mu-list-item> -->

    <mu-button icon slot="right" @click="refresh()" id="buttonbar">
      <mu-icon value="refresh"></mu-icon>
    </mu-button>
  </mu-appbar>

  <!-- <keep-alive> -->
  <router-view class="content"></router-view>
  <!-- </keep-alive> -->

  <Drawer placement="left" :closable="false" v-model="leftDrawer">
    <!-- <keep-alive> -->
    <router-view name="leftdrawer">
    </router-view>
    <!-- </keep-alive> -->
  </Drawer>

  <Drawer placement="right" :closable="true" v-model="rightDrawer">
    <!-- <keep-alive> -->
    <router-view name="rightdrawer">
    </router-view>
    <!-- </keep-alive> -->
  </Drawer>

  <mu-bottom-nav value="$route.meta.title">
    <mu-bottom-nav-item title="Calendar" value="Calendar" icon="calendar_today" to='/calendar'></mu-bottom-nav-item>
    <mu-bottom-nav-item title="Activities" value="Activities" icon="assignment" to='/activity'></mu-bottom-nav-item>
    <mu-bottom-nav-item title="More" value="More" icon="more_horiz" to='/settings'></mu-bottom-nav-item>
  </mu-bottom-nav>

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
    "Activities":"Activities",
    "Organization":"Organization",
    "Contact":"Contact",
    "Config":"Config",
    "Logout":"Logout",
    "Settings":"settings"
  },
  "zh-CN": {
    "Calendar": "日历",
    "Activities":"事件",
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
      leftDrawer: false,
      rightDrawer:false,
      currentView: null,
    };
  },
  methods: {
    setCurrentView(view) {
      // console.log(view);
      if (view == "logout") { //注销
        this.logout();
      } else if (view.indexOf('lang') == 0) { //修改语言
        this.$root.$i18n.locale = view.substr(5);
        console.log(this.$root.$i18n.locale);
      } else if (view != '#') { //跳转
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
    },
    refresh() {
      location.reload();
    }
  },
  computed: {
    routeName(){return this.$route.meta.title;}
  },
  components: {

  },
  mounted(){
    //检查是否由webapp运行
    let isInWebAppiOS = (window.navigator.standalone == true);
    let isInWebAppChrome = (window.matchMedia('(display-mode: standalone)').matches);

    if(isInWebAppiOS){
      document.getElementsByTagName('body')[0].classList.add('fixedFrame')
    }
  }
  // created:{
  //
  // }



};
</script>

<style scoped>
/* .content {
  height: calc(100% - 60px);
  margin: 0px;
  margin-top: 56px;
}

#appbar {
  position: absolute;
  width: 100%;
}

#buttonbar {
  position: absolute;
  width: 100%;
  bottom: 0px;
} */

/* 中等屏幕（桌面显示器，大于等于 992px） */

/* @media (min-width:993px)and (max-width: 1200px) { */

@media only screen and (min-width:992px) {
  .content {
    height: calc(100% - 60px);
    margin: 0px;
    /* margin-top: 56px; */
  }

  .only-show-on-mobile {
    display: none;
  }

  .only-show-on-pc{
    /* display: flex; */
  }
}

/* 小屏幕（平板，大于等于 768px） */

@media only screen and (max-width: 991px) and (min-width:768px) {

  /* .content {
    height: calc(100% - 60px);
    margin: 0px;
  }

  .only-show-on-mobile {
    display: none;
  } */
  .top-navbar {
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 32px;
  }

  .top-navbar .option-name {
    display: none;
    text-align: center;
  }

  .top-navbar .ivu-menu-item {
    line-height: 36px;
    width: 20%;
    text-align: center;
  }

  .content {
    height: calc(100% - 112px);
    margin: 0px;
  }

  .only-show-on-pc {
    display: none;
  }
}

/* 超小屏幕（手机，小于 768px） */

@media only screen and (max-width: 767px) {
  .top-navbar {
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 32px;
  }

  .top-navbar .option-name {
    display: none;
    text-align: center;
  }

  .top-navbar .ivu-menu-item {
    line-height: 36px;
    width: 20%;
    text-align: center;
  }

  .content {
    height: calc(100% - 112px);
    margin: 0px;

  }

  .only-show-on-pc {
    display: none;
  }
}
</style>

<style>
/* 中等屏幕（桌面显示器，大于等于 992px） */
/* @media (min-width:993px)and (max-width: 1200px) { */
@media only screen and (min-width:992px) {}

/* 小屏幕（平板，大于等于 768px） */
@media only screen and (max-width: 991px) and (min-width:768px) {}

/* 超小屏幕（手机，小于 768px） */
@media only screen and (max-width: 767px) {}
</style>


<style>
/*防止safari橡皮筋效果*/
html,
body,
#app {
  height: 100%;
  margin: 0px;
  overflow: hidden;

}

.fixedFrame{position:fixed;}




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

.navbar {
  margin-bottom: 0px;
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
