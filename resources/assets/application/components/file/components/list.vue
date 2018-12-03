<template>
  <div>
    <Upload
        multiple
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/">
        <div>
            <Table border :columns="columns7" :data="data6"></Table>
        </div>
    </Upload>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                columns7: [
                    {
                        title: 'Name',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: 'version',
                        key: 'age',
                    },
                    {
                        title: 'size',
                        key: 'size',
                    },
                    {
                        title: 'Last Update',
                        key: 'update_at'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                              h('Button', {
                                  props: {
                                      type: 'info',
                                      size: 'small',
                                      icon: 'ios-eye-outline'
                                  },
                                  style: {
                                      marginRight: '5px'
                                  },
                                  on: {
                                      click: () => {
                                          this.show(params.index)
                                      }
                                  }
                              },
                              // 'View'
                            ),

                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small',
                                        icon: 'md-cloud-download'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                },
                                // 'View'
                              ),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                        icon:'ios-trash-outline'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                },
                                // 'Delete'
                              )
                            ]);
                        }
                    }
                ],
                data6: [
                    {
                        name: 'John_Brown.jpg',
                        age: 3,
                        size:"3kb",
                        address: 'New York No. 1 Lake Park',

                    },
                    {
                        name: 'Jim_Green.jpg',
                        age: 1,
                        size:"3kb",
                        address: 'London No. 1 Lake Park'
                    },
                ]
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            }
        }
    }
</script>
