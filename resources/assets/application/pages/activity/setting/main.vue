<!--
设置

-->

<template>
<mu-container class="activity-setting">
  <mu-expansion-panel>
    <div slot="header">Constraint</div>
    <mu-list>
      <mu-list-item button :ripple="false" @click="setting.constraint.enable = !setting.constraint.enable">
        <mu-list-item-title>
          Enable
        </mu-list-item-title>
        <mu-list-item-action>
          <mu-switch v-model="setting.constraint.enable" readonly></mu-switch>
        </mu-list-item-action>
      </mu-list-item>
      <mu-list-item button :ripple="false" v-show="setting.constraint.enable">
        <mu-list-item-title>
          Add
        </mu-list-item-title>
        <mu-list-item-action>

        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
  </mu-expansion-panel>

  <mu-expansion-panel>
    <div slot="header">Missons</div>
    <mu-list>
      <mu-list-item button :ripple="false" @click="setting.missions.enable = !setting.missions.enable">
        <mu-list-item-title>
          Enable
        </mu-list-item-title>
        <mu-list-item-action>
          <mu-switch v-model="setting.missions.enable" readonly></mu-switch>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
  </mu-expansion-panel>

<mu-expansion-panel>
  <div slot="header">Topics</div>
  <mu-list>
    <mu-list-item button :ripple="false" @click="setting.topics.enable = !setting.topics.enable">
      <mu-list-item-title>
        Enable
      </mu-list-item-title>
      <mu-list-item-action>
        <mu-switch v-model="setting.topics.enable" readonly></mu-switch>
      </mu-list-item-action>
    </mu-list-item>
  </mu-list>
</mu-expansion-panel>

<mu-expansion-panel>
    <div slot="header">File</div>
    <mu-list>
      <mu-list-item button :ripple="false" @click="setting.file.enable = !setting.file.enable">
        <mu-list-item-title>
          Enable
        </mu-list-item-title>
        <mu-list-item-action>
          <mu-switch v-model="setting.file.enable" readonly></mu-switch>
        </mu-list-item-action>
      </mu-list-item>

      <mu-list-item button :ripple="false" @click="setting.file.sync = !setting.file.sync">
        <mu-list-item-title>
          Synchronize
        </mu-list-item-title>
        <mu-list-item-action>
          <mu-switch v-model="setting.file.sync" readonly></mu-switch>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
  </mu-expansion-panel>

  <mu-expansion-panel>
    <div slot="header">Activity</div>
    <mu-list>
      <mu-list-item button :ripple="false" @click="setting.task.sync = !setting.task.sync">
        <mu-list-item-title>
          Synchronize
        </mu-list-item-title>
        <mu-list-item-action>
          <mu-switch v-model="setting.task.sync" readonly></mu-switch>
        </mu-list-item-action>
      </mu-list-item>

      <mu-list-item button :ripple="false"  v-show="setting.task.sync">
        <mu-list-item-title>
          &nbsp&nbspConnect: google calendar - work
        </mu-list-item-title>
        <mu-list-item-action>
          <mu-switch  v-model="setting.task.sync" readonly></mu-switch>
        </mu-list-item-action>
      </mu-list-item>
      <mu-list-item button :ripple="false"  v-show="setting.task.sync">
        <mu-list-item-title>
        </mu-list-item-title>
        <mu-list-item-action>
          Add
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
  </mu-expansion-panel>

  <mu-expansion-panel>
    <div slot="header">Operat</div>
    <mu-list>
      <Button type="info" long>Import</Button>
      <Button type="primary" long>Export</Button>
      <Button type="warning" long>Clear</Button>
      <Button type="error" long>DELETE</Button>
    </mu-list>
  </mu-expansion-panel>
  <!-- notice -->



</mu-container>
</template>

<script>
// import navbar from './navbar/navbar';


export default {
  name: 'activity_setting',
  props: {
    // xxx:{
    //   type:String,
    //   default:'navbar',
    // },
  },
  data() {
    return {
      setting: {
        constraint: {
          enable: true,
          rules: [{
            tag: [],
            type: [],
            start: [],
            end: [],
          }]
        },
        missions:{
          enable:true,
        },
        topics:{
          enable:true,
        },
        file: {
          enable: true,
          sync: false,
        },
        task: {
          sync: false,
        }
      }
    };
  },
  computed: {

  },
  methods: {},
  watch: {},
  mounted() {},
  components: {

  },
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
