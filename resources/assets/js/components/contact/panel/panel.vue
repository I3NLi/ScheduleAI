<template>
  <div :height='"100%"'>
    <div v-bar="{preventParentScroll: true,scrollThrottle: 30,}" class="full">
    <p dis-hover v-for="(item, index) in data" :key="index" >
      <img :src="item.user.img" class="photo">
      :&nbsp{{ item.component.content }}
    </p>
  </div>
</div>
</template>

<script>
export default {
  name: 'panel',
  props: {
    data:Array,
    // ziel:String,
  },
  data() {
    return {
      currentUserId:window.currentUser.id,
    };
  },
  methods: {
    handleReachTop () {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.ivu-scroll-container,.ivu-scroll-content{
  height:100%;
}
</style>

<style scoped>
img.photo{
  height: 10px;
  weight: 10px;
}
</style>
