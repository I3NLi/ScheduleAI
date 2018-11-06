<!--
话题
-->

<template>
<div class="full" id='thing_topics'>
  <!-- <Page :total="10" show-elevator></Page> -->
  <Breadcrumb v-if="currentTopicData!=null">
    <BreadcrumbItem to="/">Topic</BreadcrumbItem>
    <BreadcrumbItem>{{currentTopicData.id}}</BreadcrumbItem>
  </Breadcrumb>

  <div v-show="currentTopic=='list' ">
    <div class="new-button-span">
      <Button @click="newTopic.modal = true">New</Button>
      <Modal v-model="newTopic.modal" title="创建新话题" @on-ok="createTopic" @on-cancel="cancelCreatTopic">
        <i-input v-model="newTopic.title" placeholder="Enter something..." style="width: 100%"></i-input>
      </Modal>
    </div>
    <hr/>
    <ul class="list-group">
      <li class="list-group-item" v-for="topic in data" @onclick="currentTopic=topic">
        <span>{{topic.countNotRead}}</span>
        <span>{{topic.titel}}</span>
        <span>{{topic.lastModifiedBy}}</span>
        <span>{{topic.lastModified}}</span>
      </li>
    </ul>
  </div>
  <topic v-show="currentTopic!='list'" :id="currentTopic" />
  <!-- <contact v-show="currentTopic!='list'" slot="content" :data="data.Contact" :permissions="modules.Permissions" /> -->
</div>
</template>

<script>
import topic from '../../../../chatroom/panel/panel';


export default {
  name: 'thing_topics',
  props: {
    mode: {
      type: String,
      default: "viewer", //editor || creator
    },
    currentTopic: {
      type: String,
      default: 'list',
    },
    data: {
      type: Array,
      default: function() {
        return [{
          titel: 'default',

        }, ];
      },
    },
  },
  data() {

    return {
      pageTotal: 0,
      pageNum: 1,
      pageSize: 10,
      currentTopicData: null,
      topicData: [],
      newTopic: { //与新话题相关
        modal: false, //控制模态框的开关
        title: null,
        onCreate: false,
      }

      // data: [{
      //   countNotRead: 10,
      //   titel: 'title',
      //   lastModifiedBy: 'autor',
      //   lastModified: new Date(),
      // }, {
      //   countNotRead: 13,
      //   titel: 'title',
      //   lastModifiedBy: 'autor',
      //   lastModified: new Date(),
      // }],
    };
  },
  computed: {

  },
  methods: {
    setTopic(topic) {

    },
    createTopic() {
      console.log("createTopic");
    },
    cancelCreatTopic() {
      console.log("cancelCreateTopic");
      this.newTopic.modal = false;
    },
  },
  watch: {},
  mounted() {},
  components: {
    topic
  },
};
</script>

<!-- Add "scoped" Attribute to limit CSS to this component only -->
<style scoped>
.new-button-span{
  text-align: right;
  width:100%;
}

</style>
