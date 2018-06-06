<template>
  <Scroll
  :on-reach-top="handleReachTop"
  :on-reach-bottom="handleReachBottom">

</Scroll>
</template>
<script>
export default {
  data () {
    return {
      list2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  methods: {
    handleReachTop () {
      return new Promise(resolve => {
        setTimeout(() => {
          const first = this.list2[0];
          for (let i = 1; i < 11; i++) {
            this.list2.unshift(first - i);
          }
          resolve();
        }, 2000);
      });
    },
    handleReachBottom () {
      return new Promise(resolve => {
        setTimeout(() => {
          const last = this.list1[this.list1.length - 1];
          for (let i = 1; i < 11; i++) {
            this.list1.push(last + i);
          }
          resolve();
        }, 2000);
      });
    }
  }
}
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped>

</style>
