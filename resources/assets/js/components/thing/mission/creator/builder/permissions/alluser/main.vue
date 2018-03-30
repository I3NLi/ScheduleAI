<template>
  <table style="width:100%">
    <tr>
      <th>User</th>
      <th>ID</th>
      <th>Permissions</th>
    </th>
    <tr v-for="u in data.owner">
      <td>{{getName(u.userId)}}</td>
      <td>{{u.userId.substr(-5,4)}}</td>
      <td>
        <Tag v-for="r in u.role"
        closable
        @on-close="deleteRole(u.userId,r)"
        >
          {{r}}
        </Tag>
      </td>
    </tr>
  </table>
</template>
<script>

export default {
  props:{
    data:{
      type:Object,
      // default:{},
    },
    ContactList:Array,
    OrganizationList:Array,
    OnlyInvite:{
      type:Boolean,
      default:false,
    },
  },
  data () {
    return {
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
    owner(){
      if(this.OnlyInvite==true){
        let result=[];
        loop:
        for (u in this.data.owner){
          for (r in this.data.owner[u].role)
          {
            if(this.data.ownerp[u].role[r]=="reserve")
            {
              result.push(this.data.owner[u]);
              continue loop;
            }
          }
        }
        return result;
      }else{
        return this.data.owner
      }
    }
  }
}


/*
验证权限是否已经存在
返回不存在的权限

*/

</script>
<style>

</style>
