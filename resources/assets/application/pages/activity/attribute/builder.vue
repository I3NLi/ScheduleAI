<template>
<mu-container class="activity-container">
  <mu-form :model="form" class="mu-demo-form" label-position="left" label-width="100">
    <!-- name   -->
    <mu-form-item prop="input" label="Name">
      <mu-auto-complete :data="fakerData" v-model="form.name" @change="makeFaker"></mu-auto-complete>
    </mu-form-item>
    <!-- Tags -->
    <mu-form-item prop="input" label="Tags">
      <input-tag :tags="form.tags" class="tags" :add-tag-on-blur="true" />
    </mu-form-item>
    <!-- location   -->
    <mu-form-item prop="input" label="Location">
      <mu-text-field v-model="form.setting.location"></mu-text-field>
    </mu-form-item>
    <!-- importance -->
    <mu-form-item prop="select" label="Importance">
      <mu-select v-model="form.importance">
        <mu-option v-for="importanceOption,importanceOptionIndex in importanceOptions" :key="importanceOptionIndex" :label="importanceOption" :value="importanceOptionIndex"></mu-option>
      </mu-select>
    </mu-form-item>
    <!-- Start time -->
    <mu-form-item prop="date" label="From" >
      <mu-date-input :valueFormat="dateFormat" :format="dateFormat" v-model="form.start_at" type="dateTime" actions ok-label="Ok" cancel-label="Cancel"></mu-date-input>
    </mu-form-item>
    <!-- Deadline -->
    <mu-form-item prop="date" label="To" >
      <mu-date-input :valueFormat="dateFormat" @change="setWorkTime" v-model="form.until_at" type="dateTime" actions ok-label="Ok" cancel-label="Cancel"></mu-date-input>
    </mu-form-item>
    <!-- events?todo -->
    <mu-form-item prop="input" label="Work Time">
      <mu-switch v-model="isFixed" @change="setWorkTime" :label="isFixed?'Event':'Todo'"></mu-switch>
      <!-- <mu-text-field :value="getWorkTimeWithoutUnit" ref="workTime" type="number" placeholder="Event" @change="setWorkTime" > -->
      <mu-text-field  v-model="workTime.hours" @change="setWorkTime" ref="workTimeHours" type="number" placeholder="" suffix="Hours"  class="workTimeInput" :min='0'/>
      <mu-text-field  v-model="workTime.minutes" @change="setWorkTime" ref="workTimeMinutes" type="number" placeholder="" suffix="Minutes" class="workTimeInput" :min='0'/>
      <mu-text-field  v-model="workTime.seconds" @change="setWorkTime" ref="workTimeSeconds" type="number" placeholder="" suffix="Seconds" class="workTimeInput" :min='0'/>
        <!-- <mu-select v-model="wokrTimeUnit" slot="append" style="width: 100px;" @change="setWorkTime">
          <mu-option v-for="timeUnitOption,timeUnitOptionIndex in timeUnitOptions" :key="timeUnitOptionIndex" :label="timeUnitOption" :value="timeUnitOptionIndex" ></mu-option>
        </mu-select> -->
      </mu-text-field>
    </mu-form-item>
    <!-- Restart -->
    <mu-form-item prop="select" label="Restart Art">
      <mu-select v-model="form.setting.restart.type">
        <mu-option v-for="restartTypeOption,restartTypeOptionIndex in restartTypeOptions" :key="restartTypeOptionIndex" :label="restartTypeOption" :value="restartTypeOptionIndex"></mu-option>
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
import ActivityBroadcastMixins from './mixins/ActivityBroadcastMixins'

export default {
  name: 'activity-builder',
  mixins: [ActivityBroadcastMixins],
  data() {
    return {
      fakerData:['See doctor'],
      labelPosition: "Left", //"Left",“Right”
      // dateFormat:"YYYY-MM-DDTHH:mm:ssZ",
      dateFormat:"",
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
      timeUnitOptions:[
        "Second",
        "Minute",
        "Hour"
      ],
      isFixed:false,
      workTime:{
        "hours":0,
        "minutes":5,
        "seconds":0,
      },
      wokrTimeUnit:2,
      form: this.defaultForm(),
    };
  },
  methods: {
    makeFaker(value){
      if(value=='See doctor')
      this.form={
        name: 'See doctor',
        start_at: new Date(),
        until_at: new Date(+new Date()+300000),
        importance: 4,
        estimated_time_cost: 3600,
        missions: {
          notice: "With insurance card"
        },
        tags:["life trivia"],
        setting: {
          location: "Kantstraße 2, 80807 München",
          color: 'rgba(0, 0,0, .0)',
          restart: {
            type: 'None',
          }
        }
      };
    },
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
        start_at: new Date(),
        until_at: new Date(+new Date()+3600000),
        importance: 2,
        estimated_time_cost: -1,
        missions: {
          notice: ""
        },
        setting: {
          location: "",
          color: 'rgba(0, 0,0, .0)',
          restart: {
            type: 'None',
          }
        }
      };
    },
    setWorkTime(){
      let tmp=this.workTime.hours*3600+this.workTime.minutes*60+this.workTime.seconds*1;
      if(this.isFixed){
      this.form.estimated_time_cost=-1;
      this.form.until_at=new Date(new Date(+this.form.start_at+tmp*1000));
      }
      else{
      this.form.estimated_time_cost=tmp;
      }
      return this.form.estimated_time_cost;
    },
  },
  computed:{

  },
  watch:{
    "form.estimated_time_cost":{
      handler: function(newVal,oldVal){
        let tmp;
        if(this.form.estimated_time_cost<0){
          this.isFixed=true;
          tmp=parseInt((new Date(this.form.until_at)-new Date(this.form.start_at))/1000);
        }else{
          this.isFixed=false;
          tmp=this.form.estimated_time_cost;
        }
        console.log(tmp);
        this.workTime.hours=parseInt(tmp/3600);
        tmp=parseInt(tmp%3600);
        this.workTime.minutes=parseInt(tmp/60);
        tmp=tmp%60;
        this.workTime.seconds=parseInt(tmp);
      },
      // immediate: true,
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
.workTimeInput{
  /* width: 20%; */
}
</style>
