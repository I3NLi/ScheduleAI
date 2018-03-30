<template>
  <div :height='"100%"'>
    <div v-bar="{preventParentScroll: true,scrollThrottle: 30,}" class="full">
    <Card dis-hover v-for="(item, index) in data" :key="index" >
      user{{item.user.id}}:&nbsp{{ item.component.content }}
    </Card>
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




char name[100];
for(int i=0;i<sizeof(name);i++){
  if(read(stdin,name[i],1)){
    //name[i].转换为大写();
  }else{
    break;
  }
}
