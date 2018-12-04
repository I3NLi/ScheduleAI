<template>
<div>
  <Breadcrumb>
    <Button @click="mode=(mode+1)%2">
      <Icon type="ios-apps" size="20" v-if="mode==0" />
      <Icon type="md-menu" size="20" v-if="mode==1"/>
    </Button>

    <BreadcrumbItem to="/">Activity</BreadcrumbItem>
    <BreadcrumbItem to="/components/breadcrumb">Root</BreadcrumbItem>
    <BreadcrumbItem>folder1</BreadcrumbItem>


  </Breadcrumb>

  <hr/>


<br/>
  <block v-show="mode==0"/>
  <list v-show="mode==1"/>
</div>
</template>
<script>
import block from "./components/block.vue"
import list from "./components/list.vue"
export default {
  data() {
    return {
      mode:0,
    }
  },
  methods: {

  },
  mounted() {

  },
  components:{
    block,
    list,
  }
}
</script>

<style>

</style>
