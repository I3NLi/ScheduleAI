<template>
<Card :bordered="false" :height='"100%"' class="chatRoomContentCard">
  <p slot="title" class="title">No border title</p>
  <div v-bar="{preventParentScroll: true,scrollThrottle: 30,}" class="full">
    <div dis-hover v-for="(item, index) in data" :key="index" :class="{formMe:isFormMe(item),notFormMe:!isFormMe(item)}">
      <img :src="item.user.img" v-if="!isFormMe(item)" class="profile-picture"/>
      <div class="massage-content">{{ item.component.content }} </div>
      <img :src="item.user.img" v-if="isFormMe(item)" class="profile-picture"/>
    </div>
    <!-- <Page :total="100" show-elevator></Page> -->
  </div>
</Card>
</template>

<script>
export default {
  name: 'ChatRoomPanel',
  props: {
    id: {
      type: String,
      defaulf: 'none'
    },
    data: {
      type: Array,
      default: function() {
        return [];
      },
    },
    // ziel:String,
  },
  data() {
    return {

      //  currentUserId:window.currentUser.id,
      // data:[]
    };
  },
  computed: {

  },
  methods: {
    isFormMe: function(item) {
      return false;
    },
    handleReachTop() {
      return new Promise(resolve => {
        setTimeout(() => {
          const first = this.data[0];
          for (let i = 1; i < 11; i++) {
            this.data.unshift(first - i);
          }
          resolve();
        }, 2000);
      });
    }
  },
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style>
.ivu-scroll-container,
.ivu-scroll-content {
  height: 100%;
}

.chatRoomContentCard>.ivu-card-head {
  border-bottom: 1px solid #ccc !important;
}
</style>

<style scoped>
.title {
  text-align: center;
}

/* Clear floats */

.profile-picture {
  /* border-style: solid; */
  width: 50px;
  height: 50px;
  display: inline-block;
  margin: 2px;
  border-width: thin;
}

.formMe {
  text-align: right;
}


.massage-content {
  /* color: black; */

  display: inline-block;
  max-width: 60%;
  padding: 5px;

  border-radius: 4px;
  position: relative;
  word-break:break-all;
  text-align: left;
}

.formMe>.massage-content {
  background: #9eea6a;
  margin-right: 10px;
  padding-left: 12px;
}
.notFormMe>.massage-content{
  background-color: white;
  margin-left: 10px;
  padding-right: 12px;
}

.formMe>.massage-content::after {
  content: "";
  display: inline-block;
  position: absolute;
  right: -9px;
  top: 7px;
  height: 0px;
  width: 0px;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 8px solid #9eea6a;
  margin-right: 1.5px;
}

.notFormMe>.massage-content::before {
  content: "";
  display: inline-block;
  position: absolute;
  left: -9px;
  top: 7px;
  height: 0px;
  width: 0px;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 8px solid white;
  margin-left: 1px;
}
</style>
