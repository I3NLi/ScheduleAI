<template>
<!-- <div>
  <i-input type="text" v-model='msg' @keyup.enter='submit' >
  <Spin v-show="spinShow" slot="suffix" />
  <Icon type="ios-contact" />
  <Select v-model="model1" slot="prepend">
    <Option value="@">@</Option>
    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
  </Select>
  <Button slot="append" icon="md-add" ></Button>
  <Button slot="append" icon="ios-share-alt" @click='submit'/>
  </i-input>
</div> -->
<div class="input-group ">
    <input type="text" class="form-control" v-model='msg' @keyup.enter='submit'/>
    <div class="input-group-btn">
      <Spin v-if="spinShow"/>
      <button class="btn btn-default" type="button"><span class="glyphicon glyphicon-plus"/></button>
      <button class="btn btn-default" type="button" @click='submit'><span class="glyphicon glyphicon-share-alt"/></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chatRoomInput',
  props: {
    data: Array,
    ziel: [Array, Object],
  },
  data() {
    console.log(this.data);
    return {
      msg: '',
      spinShow: false,
    };
  },
  methods: {
    send(url, data) {
      let result;
      $.ajax({
        url: url,
        type: 'POST', //GET
        async: false, //或false,是否异步
        timeout: 5000, //超时时间
        dataType: 'json', //返回的数据格式：
        data: data,
        beforeSend: function(xhr) {},
        success: function(data, textStatus, jqXHR) {
          console.log(data);
          result = true;
        },
        error: function(xhr, textStatus) {
          console.log(xhr);
          result = false;
        },
        complete: function() {}
      });
      return result;
    },
    submit() {
      if (this.msg == "") {
        alert("Message can not be empty!");
        return;
      }
      this.spinShow = true;
      let data = {
        user: {
          //
          id: 0,
          img: "/testP/images.jpg",
        },
        component: {
          type: 'text',
          content: this.msg,
        },
      };
      let erfolg = true;
      // console.log(this.ziel.type);
      switch (this.ziel.type) {
        case "mission":
          erfolg = this.send("/api/thing/contact/update", {
            _id: this.ziel.id,
            data: data
          });
          //console.log(erfolg);
          break;
        default:

      }
      if (erfolg) {
        this.data.push(data);
        this.msg = null;
      } else {
        this.$Message.warning('Message can not be sent');
      }
      this.spinShow = false;
    }
  }
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped>

</style>
