<template>
    <center id='header'>
      <br/>
      <ButtonGroup>
        <Button @click="jump('calendar_day')"> Day</Button>
        <Button disabled>Week</Button>
        <Button @click="jump('calendar_month')"> Month </Button>
        <Button disabled>Year</Button>
      </ButtonGroup>
    </center>
</template>

<script>
// import mission from '../../thing/mission/mission';

export default {
  name: 'calendarHeader',
  data() {
    return {
    };
  },
  components:{
    methods: {
      jump(path){
        this.$router.push({ namecalendar_day: path })
      }
    }
  }
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped>

</style>
