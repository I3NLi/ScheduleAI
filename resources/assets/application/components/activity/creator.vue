<template>
<mu-container class="activity-container">
  <!-- <Button size="large" type="text" class="activity-title">
    <Icon type="ios-arrow-back" />
    New
  </Button> -->

  <!-- <div>
  <Icon type="ios-arrow-back" size="32"/><span>New</span>
</div> -->
  <mu-form :model="form" class="mu-demo-form" :label-position="labelPosition" label-width="100">
    <!-- name   -->
    <mu-form-item prop="input" label="Name">
      <mu-text-field v-model="form.input"></mu-text-field>
    </mu-form-item>
    <!-- location   -->
    <mu-form-item prop="input" label="Location">
      <mu-text-field v-model="form.input"></mu-text-field>
    </mu-form-item>
    <!-- importance -->
    <mu-form-item prop="select" label="Importance">
      <mu-select v-model="form.select">
        <mu-option v-for="importanceOption,importanceOptionIndex in importanceOptions" :key="importanceOptionIndex" :label="importanceOption" :value="importanceOption"></mu-option>
      </mu-select>
    </mu-form-item>
    <!-- Start time -->
    <mu-form-item prop="date" label="From">
      <mu-date-input v-model="form.date" type="dateTime" actions></mu-date-input>
    </mu-form-item>
    <!-- Deadline -->
    <mu-form-item prop="date" label="To">
      <mu-date-input v-model="form.date" type="dateTime" actions></mu-date-input>
    </mu-form-item>
    <!-- events?todo -->

    <mu-form-item prop="switch" label="Todo/Event">
      <mu-switch v-model="form.switch" :label="form.switch?'Todo':'Event'"></mu-switch>
    </mu-form-item>

    <!-- Restart -->
    <mu-form-item prop="select" label="Restart Art">
      <mu-select v-model="form.select">
        <mu-option v-for="restartTypeOption,restartTypeOptionIndex in restartTypeOptions" :key="restartTypeOptionIndex" :label="restartTypeOption" :value="restartTypeOption"></mu-option>
      </mu-select>
    </mu-form-item>

    <!--
  <mu-form-item prop="select" label="Select">
    <mu-select v-model="form.select">
      <mu-option v-for="option,index in options" :key="option" :label="option" :value="option"></mu-option>
    </mu-select>
  </mu-form-item> -->

    <!-- Color -->
    <mu-form-item prop="date" label="Color" >
      <ColorPicker v-model="form.color" recommend alpha/>
    </mu-form-item>
    <!--  -->
    <mu-form-item prop="input" label="Tags" >
      <input-tag :tags="form.tags" class="tags" :add-tag-on-blur="true"  />
    </mu-form-item>
    <!-- notice -->
    <mu-form-item prop="textarea" label="Notice">
      <mu-text-field multi-line :rows="3" :rows-max="6" v-model="form.textarea"></mu-text-field>
    </mu-form-item>

    <mu-form-item>
      <mu-button color="primary" @click="submit">submit</mu-button>
      <mu-button @click="clear">clear</mu-button>
    </mu-form-item>
  </mu-form>
</mu-container>
</template>

<script>
import InputTag from 'vue-input-tag';

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
        color:'rgba(0, 0,0, .0)',
      }
    };
  },
  methods: {
    submit(){},
    clear(){},
    // jump(path){
    //   this.$router.push({ namecalendar_day: path })
    // }
  },
  components: {
    InputTag,
  }
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped>
.mu-demo-form {
  /* background-color: #eee; */
  padding: 16px;
}
.tags{
  width: 100%;
  border:none;
  border-bottom-width:1px;
  border-bottom-style: solid;
  border-bottom-color: #ccc;
}
.tags:active{
  border-bottom-color:#2196f3;;
}
</style>
