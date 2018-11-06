<template>
  <div style="padding-left:10px">
    <Row v-show="!is_add">
      <Col span="12" >
        <Select
        v-model="CurrentRoleTitle"
        filterable>
        <!-- :remote-method="remoteMethod1"
        :loading="loading1" -->
        <Option value="admin" key="admin">admin</Option>
        <Option value="reserve" key="reserve"></Option>
        <Option v-for="r in data" :value="r.title" :key="r.title">{{r.title}}</Option>
      </Select>
    </Col>

    <Col span="8" offset="4">
      <Button type="info" @click="change_mode">Add</Button>
    </Col>
  </Row>

  <Row v-show="is_add">
    <Col span="12">
      <i-input v-model="new_role" placeholder="Enter new role..." @keyup.enter="add_role"></i-input>
    </Col>

    <Col span="8" offset="4">
      <Button type="success" @click="add_role">Add</Button>
      <Button type="error" @click="change_mode">Cancel</Button>
    </Col>
  </Row>

  <br/>

  <Row v-show="show_transfer">
    <Col span="24">
      <Transfer
      :data="permissionslistForTransfer"
      :target-keys="this.CurrentRole.permissions"
      :render-format="renderTransfer"
      :operations="['Remove','Add']"
      filterable
      @on-change="handleChangeTransfer">
      <div :style="{float: 'right', margin: '5px'}">
        <Button type="ghost" size="small" @click="CurrentRole.permissions=[]">Refresh</Button>
      </div>
    </Transfer>
  </Col>
</Row>
<Row v-if="(!show_transfer)&&(!is_add)">
  <Col span="24" v-for="r in reserved_roles" :key="r.title" v-if="r.title==CurrentRoleTitle">
    {{r.description}}
  </Col>
</Row>
<Row v-show="is_add">
  <Col span="24">
    <Row v-for="r in reserved_roles" :key="r.title">
      <Col span="12">{{r.title}}</Col>
      <Col span="8" offset="4">
        <Button disabled size="small">Edit</Button>
        <Button disabled size="small">Delete</Button>
      </Col>
    </Row>

    <Row v-for="r in this.data" :key="r.title">
      <Col span="12">{{r.title}}</Col>
      <Col span="8" offset="4">
        <Button type="warning" size="small" @click="edit_role(r)">Edit</Button>
        <Button type="error" size="small" @click="delete_role(r)">Delete</Button>
      </Col>
    </Row>
  </Col>
</Row>


</div>
</template>
<script>

export default {
  props:{
    data:{
      type:[Object,Array],
      // default:{},
    },


  },
  data () {
    return {
      is_add:false,
      new_role:"",
      reserved_roles:[
        {
          title:"admin",
          description:"Role \"admin\" 拥有所有权限，无法被修改",
        },
        {
          title:"reserve",
          description:"Role \"reserve\" 为邀请标识，无法被修改",
        },
      ],
      CurrentRoleTitle:null,
      CurrentRole:{},
      permissionslist:[
        {"key": "aaa", "label": "aaa"},
        {"key": "bbb", "label": "bbb"},
        {"key": "ccc", "label": "ccc"},
      ],
    };
  },
  methods: {
    handleChangeTransfer (newTargetKeys, direction, moveKeys) {
      console.log(newTargetKeys);
      console.log(direction);
      console.log(moveKeys);
      this.CurrentRole.permissions = newTargetKeys;
    },
    renderTransfer(item) {
      return item.label;
    },
    change_mode(){
      return this.is_add=!this.is_add;
    },
    exist_role_by_title(roleTitle,rolelist){
      for (let r in rolelist){
        if(roleTitle==rolelist[r]["title"])
        {return roleTitle;}
      }
      return false;
    },
    exist_role(role,rolelist){
      for (let r in rolelist){
        if(role==rolelist[r])
        {return role;}
      }
      return false;
    },
    add_role(){
      let tmp=this.exist_role_by_title(this.new_role,this.reserved_roles);
      //审查是否与保留字冲突
      if(tmp){
        this.$Message.warning("The role \""+this.new_role+'\" is reserved, please use other words');
        return;
      }
      //审查是否已经存在
      if(this.exist_role_by_title(this.new_role,this.data)){
        this.$Message.warning("The role \""+this.new_role+'\" already exists');
        // this.CurrentRole=this.new_role;
        // this.is_add=true;
      }else{
        this.data.push(
          {
            title:this.new_role,
            permissions:[],
          },
        );

      }
    },
    edit_role(role){
      this.CurrentRoleTitle=role.title;
      this.is_add=false;
    },
    delete_role(role){
      for(let r in this.data){
        if(this.data[r]==role){
          return this.data.splice(r,1);
        }
      }
    },
  },
  mounted () {

    // console.log("invite data");
    // console.log(this.data);
  },
  computed:{
    show_transfer (){
      return !this.is_add&&(!this.exist_role_by_title(this.CurrentRoleTitle,this.reserved_roles));
    },
    permissionslistForTransfer(){
      let result=[];
      for(let p in this.permissionslist){
        let disabled=!this.exist_role(this.CurrentRole,this.data);
        result.push(
          {
            key:this.permissionslist[p].key,
            label:this.permissionslist[p].label,
            "disabled": disabled,
          }
        )
      }
      return result;

    }

  },
  watch:{
    "CurrentRoleTitle":function (){
      for(let r in this.data){
        if(this.data[r].title==this.CurrentRoleTitle){
          return this.CurrentRole=this.data[r];
        }
      }
    },

  }
}


/*
验证权限是否已经存在
返回不存在的权限

*/

</script>
<style>

</style>
