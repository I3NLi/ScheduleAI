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
      <Upload
            :before-upload="handleImport"
            action=""
            accept="ics">
            <Button type="info" long>Import</Button>
      </Upload>

      <Button type="primary" long>Export</Button>
      <Button type="warning" long>Clear</Button>
      <Button type="error" long>DELETE</Button>
    </mu-list>
  </mu-expansion-panel>
  <!-- notice -->



</mu-container>
</template>

<script>
import iCal from 'ical.js';


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
  methods: {
    handleImport(file) {
      let vm=this;
      let reader = new FileReader();
      reader.onload = function (e) {

        console.log(vm.importJcal(iCal.parse(e.target.result)));
        };
      reader.readAsText(file);
      return false;
    },
    importJcal(Jcal){
      let result=[];
      Jcal[2].forEach(function(activity){
        let vevent=activity[0]=='vevent'?true:false;
        result.push({
          name:activity[1][5][3],
          start_at: new Date(activity[1][7][3]),
          until_at: new Date(activity[1][8][3]),
          importance: 3,
          estimated_time_cost: vevent?-1:300,
          missions: {
            Notice: activity[1][4][3]
          },
          setting: {
            location: activity[1][9][3],
            color: 'rgba(0, 0,0, .0)',
            restart: {
              type: 'None',
            }
          }
        });
      });
      return result;
    }
  },
  watch: {},
  mounted() {
    console.log(iCal);
  },
  components: {

  },
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
