<template>
  <Tabs value="Permissions" style="height:400px">
    <TabPane label="邀请" name="name1" >
      <invite :data="data" :ContactList="ContactList" :OrganizationList="OrganizationList"/>
    </TabPane>
    <TabPane label="所有人" name="name2" >
      <alluser :data="data" :ContactList="ContactList" :OrganizationList="OrganizationList"/>
    </TabPane>
    <TabPane label="角色" name="name3" >
      <role :data="data.role"/>
    </TabPane>
  </Tabs>
</template>
<script>
import invite from "./invite/main";
import alluser from "./alluser/main"
import role from "./role/main"
export default {
  name:"Permissions",
  props:{
    data:{
      type:Object,
      // default:{},
    }
  },
  data () {

    return {
      ContactList:[
        {
          username: 'admin',
          _id: 'xxxxx123'
        },
        {
          username: 'Boning',
          _id: 'xxxxx123asd'
        },
      ],
      OrganizationList:[

      ],
    }
  },
  methods: {

  },
  mounted () {
    // console.log("data");
    // console.log(this.data);
  },
  components:{
    invite,
    alluser,
    role,
  }
}
</script>
<style>

</style>
