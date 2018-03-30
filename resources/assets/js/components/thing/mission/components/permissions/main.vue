<template>
  <Tabs value="name1">
        <TabPane label="邀请" name="name1" :data="data">
          <invite/>
        </TabPane>
        <TabPane label="所有人" name="name2" :data="data">
          <!-- <owner/> -->
        </TabPane>
        <TabPane label="权限" name="name3" :data="data">
          <!-- <permissions/> -->
        </TabPane>
  </Tabs>
</template>
<script>
import invite from "./invite/main";

export default {
  name:"Permissions",
  props:{
    data:{
      type:Object,
      default:{},
    }
  },
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {

  },
  components:{
    invite,
  }
}
</script>
<style>

</style>
