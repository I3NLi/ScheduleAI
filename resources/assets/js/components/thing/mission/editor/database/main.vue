<template>
  <div id="builder">
    <Collapse v-model="Collapse">
      <Panel name="Modul">
        Modul
        <Tree :data="modul" slot="content" show-checkbox></Tree>
      </Panel>
      <Panel v-for="(module,key) in modules" :name="key">
        {{key}}
        <component slot="content" :is="key" :data="module"/>
      </Panel>
    </Collapse>
  </div>

</template>

<script>

// import File from './file/main';
// import Database from './database/main';
// import Contact from './contact/main';


export default {
  name: 'database',
  prop:{
    data:Object,
  },
  data() {
    return {
      Collapse:["Modul","Attribut","Mission"],
      modules:{//根据id远程读入，模板的信息
        Attribut:{
          time:{
            type:'once',
            data:{
              startCondition:'immediately',
              startTime:new Date(),
            },
          },
          importance:"2",
          tags:[],
        },
        Mission:[],
        Database:{},
        // Contact:{},
      },
      modul:[
        {
          title: 'Attribut',
          expand: true,
          multiple:false,
          children: [
            {
              title: 'default',
              expand: true,
              multiple:false,
              children: [
              ]
            },
            {
              title: 'repeat',
              expand: true,
              multiple:false,
              children: [
              ]
            },
          ]
        },
        {
          title: 'Mission',
          expand: true,
          children: [
          ]
        },
        {
          title: 'File',
          expand: true,
          children: [
          ]
        },
        {
          title: 'Database',
          expand: true,
          children: [
          ]
        },
        {
          title: 'Contact',
          expand: true,
          children: [
          ]
        },

      ]
    };
},
components: {
  Attribut,
  Mission,
},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
/*nav{ height: 42px; border: 1px red; }*/
.c_input{
  position: fixed;
  bottom: 0px;
}
</style>
