<template>
  <div id='missionCreator'  style="width: 100%; ">
    <h3>create a mission in # {{data.id}}</h3>
    <hr/>
    <fieldset v-for="(templategruppe,gkey) in template_list">
      <legend >{{gkey}}</legend>
      <br/>
      <div
      v-for="(template,tkey) in templategruppe"
      class="template"
      @click="create(template)">
      <img/>
      <label>{{template.title}}</label>
    </div>
  </fieldset>
  <hr/>
</div>
</template>

<script>
// import attr from '../attr/attr';
// import missionComponent from '../missionComponent/missionComponent';
// import file from '../../../file/file'
// import c_panel from '../../../contact/panel/panel'
// import c_input from '../../../contact/input/input'

export default {
  name: 'creator',
  props:{
    data:Object,
  },
  data() {
    return {
      template_list:{
        default:[],
        personal:[],
      }
    };
  },
  methods:{
    create(event){
      // console.log("data");
      // console.log(this.data);
      this.data.template=event.data;
      // console.log("event");
      // console.log(event);
      this.data.template.Attribut.fatherId=this.data.id;
      this.data.currentView='builder';
    },
    load_template(){
      let vm=this;
      this.showLoading();
    //  window.app.main.showLoading();
      axios.get('/api/thing/template')
      .then(function (response) {
        vm.template_list=response.data;
        // console.log(vm.data);
        vm.hideLoading();
        //console.log(window.app.thing.activeThingNode);
      })
      .catch(function (error) {
        console.log(error);
      });

    },
    showLoading(){
      this.$Spin.show({
        render: (h) => {
          return h('div', [
            h('Icon', {
              'class': 'demo-spin-icon-load',
              props: {
                type: 'load-c',
                size: 18
              }
            }),
            h('div', 'Loading')
          ])
        }
      });
    },
    hideLoading(){ this.$Spin.hide();}
  },
  mounted: function () {
    this.load_template();
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
    })
  },
  components: {

  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
/*nav{ height: 42px; border: 1px red; }*/
.template{
  width: 70px;
  text-align: center;
  display: inline-block;
}
div.template>img{
  width:50px;
  height: 50px;
  display:inline;
}

div.template>label{
  text-align: center;

}
</style>
