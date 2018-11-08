<template>
<div class="activity-container">


  <group>
    <!-- name   -->
    <x-input title="Name" placeholder="Name" novalidate placeholder-align="right" v-model="form.name"></x-input>
    <!-- location   -->
    <x-input title="Location" placeholder="Location" novalidate placeholder-align="right" v-model="form.location"></x-input>
  </group>

  <group>
    <!-- Importance -->
    <selector title="Importance" v-model="form.select" :options="importanceOptions"></selector>
    <!-- Start time -->
    <datetime v-model="form.start_at" format="YYYY-MM-DD HH:mm" title="From" />
    <!-- Deadline -->
    <datetime v-model="form.until_at" format="YYYY-MM-DD HH:mm" title="To" />
    <!-- events?todo -->
    <x-switch :title="form.switch?'Todo':'Event'" v-model="form.switch"></x-switch>
    <!-- Restart -->
    <selector title="Restart Art" v-model="form.restart" :options="restartTypeOptions"></selector>
  </group>

  <group>
    <!-- Color -->
    <cell title="Color">
      <ColorPicker v-model="form.color" recommend alpha />
    </cell>
    <!-- Tag -->
    <cell title="Tag">
      <input-tag :tags="form.tags" class="tags" :add-tag-on-blur="true" />
    </cell>
  </group>

  <group>
    <!-- notice -->
    <x-textarea :max="200" :placeholder="Notice"></x-textarea>

    <!-- <mu-form-item>
      <mu-button color="primary" @click="submit">submit</mu-button>
      <mu-button @click="clear">clear</mu-button>
    </mu-form-item>
  </mu-form>-->
  </group>
</div>
</template>

<script>
import {
  XInput,
  Selector,
  Datetime,
  XSwitch,
  XTextarea
} from 'vux'

export default {
  name: 'activity-creator',
  data() {
    return {
      labelPosition: "Top", //"Left",“Right”
      importanceOptions: [
        "Insignificant",
        "unimportant",
        "Normal",
        "Important",
        "Fatal"
      ],
      restartTypeOptions: [
        "Daily",
        "Weekly",
        "Monthly",
        "Yearly",
        "Interval",
      ],
      form: {
        color: 'rgba(0, 0,0, .0)',
      }
    };
  },
  methods: {
    submit() {},
    clear() {},
    // jump(path){
    //   this.$router.push({ namecalendar_day: path })
    // }
  },
  components: {
    XInput,
    Selector,
    Datetime,
    XSwitch,
    XTextarea

  }
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped>
.mu-demo-form {
  /* background-color: #eee; */
  padding: 16px;
}

.tags {
  width: 100%;
  border: none;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #ccc;
}

.tags:active {
  border-bottom-color: #2196f3;
  ;
}
</style>
