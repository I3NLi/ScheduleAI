<template>
<div id='app' class="">
  <Menu mode="horizontal" :theme="'primary'" active-name="currentView" @on-select="setCurrentView" class="top-navbar">
    <MenuItem name="calendar">
    <Icon type="calendar" />
    <span class="option-name">&nbsp&nbsp{{$t('calendar')}}</span>
    </MenuItem>
    <MenuItem name="thing">
    <Icon type="clipboard" />
    <span class="option-name">&nbsp&nbsp事件</span>
    </MenuItem>
    <MenuItem name="organization">
    <Icon type="person-stalker" />
    <span class="option-name">&nbsp&nbsp组织</span>
    </MenuItem>
    <MenuItem name="contact">
    <Icon type="chatboxes" />
    <span class="option-name">&nbsp&nbsp联系人</span>
    </MenuItem>
    <MenuItem name="config" class="only-mobile">
    <Icon type="gear-b"></Icon>
    <span class="option-name">Config</span>
    </MenuItem>
    <Submenu name="Config" style="float:right" class="only-pc">
      <template slot="title">
        <Icon type="stats-bars"></Icon>
        <span class="option-name">Config</span>
      </template>

      <MenuGroup title="System">
        <MenuItem name="logout">Logout</MenuItem>
      </MenuGroup>

      <MenuGroup title="Language">
        <MenuItem name="lang_en">English</MenuItem>
        <MenuItem name="lang_de">Deutsch</MenuItem>
        <MenuItem name="lang_zh">中文-简体</MenuItem>
      </MenuGroup>
    </Submenu>

  </Menu>

  <keep-alive>
    <router-view class="content"></router-view>
  </keep-alive>


</div>
</template>

<i18n>
{
  "en": {
    "calendar": "calendar"
  },
  "zh": {
    "calendar": "日历"
  }
}
</i18n>

<script>
import {
  Tabbar,
  TabItem
} from 'mint-ui';
export default {
  name: 'app',
  data() {

    return {

    };
  },
  methods: {
    setCurrentView(view) {
      // console.log(view);
      if (view == "logout") {
        this.logout();
      } else if (view.indexOf('lang')==0){
          this.$i18n.locale = view.substr(5);
          console.log(this.$i18n.locale);
      }
      else if (view != '#') {
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
  .content {
    height: calc(100% - 60px);
    margin: 0px;
  }
  .only-mobile {
    display: none;
  }
}

/* 小屏幕（平板，大于等于 768px） */

@media only screen and (max-width: 991px) and (min-width:768px) {
  .content {
    height: calc(100% - 60px);
    margin: 0px;
  }
  .only-mobile {
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
    height: calc(100% - 32px);
    margin: 0px;
  }
  .only-pc {
    display: none;
  }
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
html,
body,
#app {
  height: 100%;
  margin: 0px;
  overflow: hidden;
}

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
