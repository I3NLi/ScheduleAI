<template>
  <div>
    <Row class="fullheight">
      <Col span="10" style="padding-right:10px">

        <Select v-model="Invitees" filterable multiple clearable>
          <OptionGroup label="Contact">
            <Option v-for="item in ContactList" :value="item._id" :key="item._id">
              <span>{{ item.username }}</span>
              <span style="float:right;color:#ccc">{{ item._id.substr(-1,-4) }}</span>
            </Option>
          </OptionGroup>

          <OptionGroup label="Organization">
            <Option v-for="item in OrganizationList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </OptionGroup>

        </Select>
      </Col>
      <Col span="10">
        <Select v-model="Role" filterable multiple clearable>
          <Option v-for="item in RoleList" :value="item.label" :key="item.label">
            <!-- <Tooltip :content="permissionslist(item.permissions)">
            {{item.label}}
          </Tooltip> -->

          {{item.label}}

        </Option>
      </Select>
    </Col>
    <Col span="4">
      <Button type="primary" @click="invite()">invite</Button>
    </Col>
  </Row>
  <br/>
  <!-- Only the invitees are shown here -->
  <alluser
  :data="data"
  :ContactList="ContactList"
  :OrganizationList="OrganizationList"
  :OnlyInvite="true"></alluser>
</div>
</template>
<script>
import alluser from "../alluser/main";

export default {
  props:{
    data:{
      type:Object,
      // default:{},
    }
  },
  data () {
    return {
      Invitees: [],

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

      RoleList: [
        {
          label:"Admin",
          permissions:[
            {
              title:"all",
              _id:[],
            }
          ],
        }
      ],
      Role:[],







    };

  },
  methods: {
    deleteRole( userId,permission){
      console.log("userId:"+userId+" permission:"+permission);
      if(permission=="reserve"){
        for(let u in this.data.owner){
          if(this.data.owner[u].userId==userId)
          {
            this.$Message.warning("取消用户\""+this.getName(userId)+"\"的邀请，清除其所有权限");
            this.data.owner.splice(u, 1);
            return true;
          }
        }
      }

      for(let u in this.data.owner){
        if(this.data.owner[u].userId==userId)
        {
          for(let p in this.data.owner[u].role){
            if(this.data.owner[u].role[p]==permission)
              {
                this.data.owner[u].role.splice(p, 1);
                if(this.data.owner[u].role==[]){
                  this.$Message.warning(this.getName(userId)+" 所有权限被消除");
                  // this.data.owner.splice(u, 1);
                }
                this.$Message.warning("消除用户\""+this.getName(userId)+"\"的"+permission+"权限成功");
                return true;
            }
          }
        }

      }
      this.$Message.warning("消除用户\""+this.getName(userId)+"\"的"+permission+"权限失败");
      return false;
    },
    getName(_id){
      //Contact
      for (let u in this.ContactList){
        if(_id==this.ContactList[u]._id)
          return this.ContactList[u].username;
      }
      // OrganizationList
      // for (let u in this.OrganizationList){
      //   if(_id==this.OrganizationList[u]._id)
      //     return this.OrganizationList[u].username;
      // }
    },
    permissionslist: function (permissions){
      let result="";
      for (let per in permissions){
        result+=per.title;
        result+="\r\n";
      }
      return result;
    },

    invite:function (){
      for(let Invite in this.Invitees)
      {

        let r=this.check_role(this.Invitees[Invite],this.Role,this.data.owner);

        if(typeof r!="object"&&typeof r!="array"){
          //console.log(typeof r);
          let tmp=["reserve"];
          for(let ro in this.Role){
            tmp.push(this.Role[ro]);
          }
          this.data.owner.push(
            {
              userId:this.Invitees[Invite],
              role:tmp,
            }
          );

        }else{
          //console.log("true");
          for (let u in this.data.owner){
            //console.log("xxx");
            if(this.data.owner[u].userId==this.Invitees[Invite]){
              for(let ro in r){
                this.data.owner[u].role.push(r[ro]);
              }
              break;
            }
          }
        }
      }
      //console.log(this.data);
      return this.data;
    },
    check_role:function (userId,role,permissionslist){
      // console.log("uid:"+userId);
      // console.log("role");
      // console.log(role);
      // console.log("permissionslist");
      // console.log(permissionslist);
      for(let per in permissionslist){
        if(permissionslist[per].userId==userId){

          let result=[];
          loop:
          for(let r in role){
            for(let pr in permissionslist[per]["role"])
            {
              if(role[r]==permissionslist[per]["role"][pr])
              {
                this.$Message.warning(this.getName(permissionslist[per].userId)+" 已具有 "+role[r]);
                continue loop;
              }
            }
            result.push(role[r]);
          }
          // console.log("return result");
          // console.log(result);
          return result;
        }

      }
      // console.log("return false");
      return false;
    },
  },
  mounted () {

    // console.log("invite data");
    // console.log(this.data);
  },
  computed:{

  },
  components:{
    alluser,
  }
}


/*
验证权限是否已经存在
返回不存在的权限

*/

</script>
<style>

</style>
