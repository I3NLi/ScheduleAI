<template>
  <Row>
    <Col span="10" style="padding-right:10px">
      <Select v-model="Invitees" filterable multiple clearable>

        <OptionGroup label="Contact">
            <Option v-for="item in ContactList" :value="item.username" :key="item.username">
              <span>{{ item.username }}</span>
              <span style="float:right;color:#ccc">{{ item._id.substr(0,4) }}</span>

            </Option>
        </OptionGroup>

        <OptionGroup label="Organization">
            <Option v-for="item in OrganizationList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </OptionGroup>

      </Select>
    </Col>
    <Col span="10">
      <Select v-model="model12" filterable multiple clearable>
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </Col>
    <Col span="4">
      <Button type="primary">invite</Button>
    </Col>
  </Row>
</template>
<script>
export default {
  props:{
    data:{
      type:Object,
      default:{},
    }
  },
  data () {
    return {
      ContactList:[
        {
          Username: 'admin',
          _id: 'xxxxx'
        },

      ],
      OrganizationList:[

      ],
      Invitees: [],
      model12: [],

    }

  },
  methods: {

  },
  mounted () {

  },
  computed:{

  }
}
</script>
<style>

</style>
