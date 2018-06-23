<template>
<div :height='"100%"'>
  <div v-bar="{preventParentScroll: true,scrollThrottle: 30,}" class="full">
    <p dis-hover v-for="(item, index) in data" :key="index">
      <img :src="item.user.img" class="photo">
      <!-- <span class="left" v-if="item."> &nbsp{{ item.component.content }} </span> -->
      <span class="left"> &nbsp{{ item.component.content }} </span>
    </p>
  </div>
</div>
</template>

<script>
export default {
  name: 'panel',
  props: {
    data: Array,
    // ziel:String,
  },
  data() {
    return {
      //  currentUserId:window.currentUser.id,
    };
  },
  methods: {
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
</style>

<style scoped>
/* Clear floats */

img {
  border-style: solid;
  width: 50px;
  height: 50px;
  display: inline-block;
  border-color: black;
  margin: 2px;
  border-width: thin;
}

span {
  color: black;
  display: inline-block;
  max-width: 200px;
  background-color: lightgray;
  padding: 5px;
  border-radius: 4px;
  position: relative;
  border-width: 1px;
  border-style: solid;
  border-color: gray;
  margin-left: 10px;
}



span.left:after {
  content: "";
  display: inline-block;
  position: absolute;
  left: -8.5px;
  top: 7px;
  height: 0px;
  width: 0px;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 8px solid lightgray;
  margin-left: 1.5px;
}

span.left:before {
  content: "";
  display: inline-block;
  position: absolute;
  left: -9px;
  top: 7px;
  height: 0px;
  width: 0px;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 8px solid gray;
  margin-left: 1px;
}
</style>
