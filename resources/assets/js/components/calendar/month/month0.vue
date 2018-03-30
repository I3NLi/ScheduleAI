<template>
  <div id='calendar'>
    <table>
      <tr>
        <td calss="left">
          <DatePicker
          type="month" placeholder="Select month"
          :open="open"
          :value="value3"
          confirm
          @on-change="handleChange"
          @on-clear="handleClear"
          @on-ok="handleOk">
          <a href="javascript:void(0)" @click="handleClick">
            <Icon type="ios-calendar-outline"></Icon>
            <template v-if="value3 === ''">Select date</template>
            <template v-else>{{ value3 }}</template>
          </a>
          
        </DatePicker>
      </td>
      <td class='center'>
        <div class="btn-group" role="group" aria-label="...">
          <button type="button" class="btn btn-default">日</button>
          <button type="button" class="btn btn-default">周</button>
          <button type="button" class="btn btn-default">今</button>
          <button type="button" class="btn btn-default">月</button>
          <button type="button" class="btn btn-default">年</button>
        </div>
      </td>
      <td>
        <div class="btn-group right" role="group" aria-label="...">
          <button type="button" class="btn btn-default"><Icon type="search" /></button>
          <button type="button" class="btn btn-default"><Icon type="plus-round" /></button>
        </div>
      </td>
    </tr calss="right">
  </table>
  <table>
    <tr>
      <td v-for="n in langSets.weekNames">
        {{n}}
      </td>
    </tr calss="right">
  </table>
  <Scroll class="content"
  :on-reach-top="handleReachTop"
  :on-reach-bottom="handleReachBottom"
  :distance-to-edge="-50">
  <fullcalendar
  v-for="month in months"
  :currentDate="month" />
</Scroll>

</div>
</template>
<script>
import fullcalendar from './components/vue-fullcalendar/src/components/body';
import langSets from './components/vue-fullcalendar/src/components/langSets';
// import fullcalendar from 'vue-fullCalendar';
export default {
  data () {
    return {
      months: [],
    }
  },
  created () {
    this.months.push(new Date());
    // this.events = events
  },
  computed : {
    langSets () {
      return langSets['zh'];
    },
  },
  methods: {
    handleReachTop () {
      return new Promise(resolve => {
        setTimeout(() => {
          const first = this.months[0];
          let tmp=new Date();
          tmp.setMonth(first.getMonth()-1);
          this.months.unshift(tmp);
          resolve();
        }, 2000);
      });

    },
    handleReachBottom () {
      return new Promise(resolve => {
        setTimeout(() => {
          const last = this.months[this.months.length - 1];
          let tmp=new Date()
          // console.log("最后时间"+last+"\n");
          // console.log("最后月份"+last.getMonth()+"\n");
          // console.log("修改月份"+(last.getMonth()+11)%12+"\n");
          tmp.setMonth(last.getMonth()+1)
          // console.log("添加时间"+tmp+"\n");
          this.months.push(tmp);
          resolve();
        }, 2000);

      });

    },
    handleClick () {
      this.open = !this.open;
    },
    handleChange (date) {
      this.value3 = date;
    },
    handleClear () {
      this.open = false;
    },
    handleOk () {
      this.open = false;
    }
  },
  components:{
    fullcalendar,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->


<style scoped>

table{
  width: 100%;
  height: 52px;
  /*border: 1px solid;*/
  background: #bbb;
}
tr{
  text-align: center;
}
td{
  /*width: 33.3%;*/
}
.left{text-align: left;}
.center{}
  .content{height:calc(100% - 104px);}
  </style>

  <style >
  .ivu-scroll-container,.fullheight{
    height:100% !important;
  }
  </style>
