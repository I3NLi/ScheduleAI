<template>
<div>
  <Card>
    <div style="text-align:center" @click="showGantt=true;" >
      <img src="/images/gantt.png" style="width:170px;height:170px">
      <h3>Gantt</h3>
    </div>
  </Card>

  <Card>
    <div style="text-align:center">
      <i-circle :size="170" :trail-width="4" :stroke-width="5" :percent="75" stroke-linecap="square" stroke-color="#43a3fb">
        <div class="demo-Circle-custom">
          <h1>42</h1>
          <p>Jobs</p>
          <span>
                Completed
                <i>75%</i>
            </span>
        </div>
      </i-circle>

      <h3>statistics</h3>
    </div>
  </Card>

  <Card>
    <div style="text-align:center">
      <img src="/images/Histogram.png" style="width:170px;height:170px">
      <h3>Histogram</h3>
    </div>
  </Card>

  <Card>
    <div style="text-align:center">
      <img src="/images/radar.png" style="width:170px;height:170px">
      <h3>radar</h3>
    </div>
  </Card>

  <Modal v-model="showGantt" fullscreen footer-hide title="Fullscreen Modal">
    <!-- <gantt/> -->
  </Modal>
</div>
</template>

<script>
import gantt from './elastigantt/src/Elastigantt';

export default {
  name: 'analysics',
  props: {
    showGantt:false,
    id: String,
    Tactive: {
      type: String,
      default: 'mission',
    },
    topic: {
      type: String,
      default: 'list',
    }
  },
  data() {
    return {}
  },
  components:{
    gantt
  }
}
</script>

<style lang="less">
.demo-Circle-custom {
    & h1 {
        color: #3f414d;
        font-size: 28px;
        font-weight: normal;
    }
    & p {
        color: #657180;
        font-size: 14px;
        margin: 10px 0 15px;
    }
    & span {
        display: block;
        padding-top: 15px;
        color: #657180;
        font-size: 14px;
        &:before {
            content: '';
            display: block;
            width: 50px;
            height: 1px;
            margin: 0 auto;
            background: #e0e3e6;
            position: relative;
            top: -15px;
        };
    }
    & span i {
        font-style: normal;
        color: #3f414d;
    }
}
</style>
