<template>
<mu-container class="activity-container">
  <mu-form :model="form" class="mu-demo-form" label-position="left" label-width="100">
    <!-- name   -->
    <mu-form-item prop="input" label="Name">
      <mu-text-field v-model="form.name"></mu-text-field>
    </mu-form-item>
    <!-- location   -->
    <mu-form-item prop="input" label="Location">
      <mu-text-field v-model="form.setting.location"></mu-text-field>
    </mu-form-item>
    <!-- importance -->
    <mu-form-item prop="select" label="Importance">
      <mu-select v-model="form.importance">
        <mu-option v-for="importanceOption,importanceOptionIndex in importanceOptions" :key="importanceOptionIndex" :label="importanceOption" :value="importanceOption"></mu-option>
      </mu-select>
    </mu-form-item>
    <!-- Start time -->
    <mu-form-item prop="date" label="From" >
      <mu-date-input :valueFormat="dateFormat" :format="dateFormat" v-model="form.start_at" type="dateTime" actions ok-label="Ok" cancel-label="Cancel"></mu-date-input>
    </mu-form-item>
    <!-- Deadline -->
    <mu-form-item prop="date" label="To" >
      <mu-date-input :valueFormat="dateFormat" v-model="form.until_at" type="dateTime" actions ok-label="Ok" cancel-label="Cancel"></mu-date-input>
    </mu-form-item>
    <!-- events?todo -->
    <mu-form-item prop="input" label="Work Time">
      <mu-text-field v-model="form.estimated_time_cost" type="number" placeholder="0 for Event" suffix="Min" />
    </mu-form-item>
    <!-- Restart -->
    <mu-form-item prop="select" label="Restart Art">
      <mu-select v-model="form.setting.restart.type">
        <mu-option v-for="restartTypeOption,restartTypeOptionIndex in restartTypeOptions" :key="restartTypeOptionIndex" :label="restartTypeOption" :value="restartTypeOption"></mu-option>
      </mu-select>
    </mu-form-item>

    <!-- <mu-form-item prop="select" label="Restart Interval" v-if="form.setting.restart.type=='Weekly'">
      <mu-select v-model="form.setting.restart.type">
        <mu-option v-for="restartTypeOption,restartTypeOptionIndex in restartTypeOptions" :key="restartTypeOptionIndex" :label="restartTypeOption" :value="restartTypeOption"></mu-option>
      </mu-select>
    </mu-form-item>
    <mu-form-item prop="select" label="Restart Interval" v-if="form.setting.restart.type=='Monthly'">
      <mu-select v-model="form.setting.restart.type">
        <mu-option v-for="restartTypeOption,restartTypeOptionIndex in restartTypeOptions" :key="restartTypeOptionIndex" :label="restartTypeOption" :value="restartTypeOption"></mu-option>
      </mu-select>
    </mu-form-item>
    <mu-form-item prop="select" label="Restart Interval" v-if="form.setting.restart.type=='Yearly'">
      <mu-select v-model="form.setting.restart.type">
        <mu-option v-for="restartTypeOption,restartTypeOptionIndex in restartTypeOptions" :key="restartTypeOptionIndex" :label="restartTypeOption" :value="restartTypeOption"></mu-option>
      </mu-select>
    </mu-form-item>
    <mu-form-item prop="select" label="Restart Interval" v-if="form.setting.restart.type=='Interval'">
      <mu-select v-model="form.setting.restart.type">
        <mu-option v-for="restartTypeOption,restartTypeOptionIndex in restartTypeOptions" :key="restartTypeOptionIndex" :label="restartTypeOption" :value="restartTypeOption"></mu-option>
      </mu-select>
    </mu-form-item> -->

    <!-- Color -->
    <mu-form-item prop="date" label="Color">
      <ColorPicker v-model="form.setting.color" recommend alpha />
    </mu-form-item>
    <!--  -->
    <mu-form-item prop="input" label="Tags">
      <input-tag :tags="form.tags" class="tags" :add-tag-on-blur="true" />
    </mu-form-item>
    <!-- notice -->
    <mu-form-item prop="textarea" label="Notice">
      <mu-text-field multi-line :rows="3" :rows-max="6" v-model="form.missions.notice"></mu-text-field>
    </mu-form-item>

    <mu-form-item>
      <mu-button color="primary" @click="submit">submit</mu-button>
      <mu-button @click="cancel">cancel</mu-button>
    </mu-form-item>
  </mu-form>
</mu-container>
</template>

<script>
import InputTag from 'vue-input-tag';
import ActivityBroadcastMixins from '../mixins/ActivityBroadcastMixins'

export default {
  name: 'activity-builder',
  mixins: [ActivityBroadcastMixins],
  data() {
    return {
      labelPosition: "Left", //"Left",“Right”
      dateFormat:"YYYY-MM-DDTHH:mm:ssZ",
      importanceOptions: [
        "Insignificant",
        "unimportant",
        "Normal",
        "Important",
        "Fatal"
      ],
      restartTypeOptions: [
        "None",
        "Daily",
        "Weekly",
        "Monthly",
        "Yearly",
        "Interval",
      ],
      form: this.defaultForm(),
    };
  },
  methods: {
    submit() {
      let vm=this;
      axios.post('/api/v1/activity', this.form)
        .then(function(response) {
          console.log(response);
          vm.activities.push(response.data);
          console.log(vm.$root.activities);
        })
        .catch(function(error) {
          console.log(error);
        });

    },
    cancel() {
      // this.form=this.defaultForm();
      this.$router.go(-1);
    },
    defaultForm() {
      return {
        // name: "",
        start_at: +new Date(),
        importance: "Normal",
        estimated_time_cost: 0,
        missions: {
          Notice: ""
        },
        setting: {
          location: "",
          color: 'rgba(0, 0,0, .0)',
          restart: {
            type: 'None',
          }
        }
      };
    }
  },
  components: {
    InputTag,
  }
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped>
.activity-container {
  overflow: scroll;
}

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
