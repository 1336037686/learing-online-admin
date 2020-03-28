<template>
  <Row style="margin: 20px">
    <!--面包屑-->
    <Breadcrumb>
      <BreadcrumbItem>
        <Icon type="ios-home-outline"></Icon>
        主页
      </BreadcrumbItem>
      <BreadcrumbItem>公告管理</BreadcrumbItem>
      <BreadcrumbItem>公告管理</BreadcrumbItem>
    </Breadcrumb>
    <!--操作按钮-->
    <Row style="margin-top: 20px;background:#eee;padding: 20px">
      <Col span="2">
        <Button type="primary" icon="ios-cloud-done-outline" @click="formItem.input = '';addModelState = true">添加公告</Button>
      </Col>
      <Col span="1" offset="1"><span style="font-size: 20px">筛选:</span></Col>
      <Col span="6">
        <Row>
          <Col span="11"><DatePicker type="date" placeholder="开始日期" v-model="formItem.date"></DatePicker></Col>
          <Col span="1" style="text-align: center">-</Col>
          <Col span="11"><DatePicker type="date" placeholder="结束日期" v-model="formItem.date"></DatePicker></Col>
        </Row>
      </Col>
      <Col span="4">
        <Input v-model="formItem.input" placeholder="输入关键字"></Input>
      </Col>
      <Col span="2" style="margin-left: 10px">
        <Button type="primary">查找</Button>
      </Col>
    </Row>
    <!--表格-->
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table border :columns="columns12" :data="data6">
          <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
            <Button type="error" size="small" @click="remove(index)">删除</Button>
          </template>
        </Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="100" :current="1"></Page>
          </div>
        </div>
      </Col>
    </Row>

    <!--添加公告-->
    <Modal v-model="addModelState" fullscreen title="公告操作">
      <p slot="header" style="text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>添加公告</span>
      </p>
      <div style="text-align:center">
        <Row style="background:#eee;padding: 20px">
          <Col span="1">
            <span style="color: red;font-size: 20px">*</span>
            <span style="font-size: 20px">标题</span>
          </Col>
          <Col span="23">
            <Input v-model="formItem.input" placeholder="填写标题"></Input>
          </Col>
        </Row>
        <Row>
          <Col span="24" style="margin-top: 10px">
            <TinymceEditer :height="700" ref="editor" v-model="msg" :disabled="disabled" />
          </Col>
        </Row>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long @click="save">发布公告</Button>
      </div>
    </Modal>
  </Row>
</template>

<script>
  import TinymceEditer from '@/components/Editer/TinymceEditer/index.vue'
  export default {
    name: "index",
    components: {
      TinymceEditer
    },
    data() {
      return {
        msg: '',
        formItem: {
          id: '',
          input: '',
          date: ''
        },
        addModelState: false,
        updateModelState: false,
        columns12: [
          {
            title: 'Name',
            slot: 'name'
          },
          {
            title: 'Age',
            key: 'age'
          },
          {
            title: 'Address',
            key: 'address'
          },
          {
            title: 'Action',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ],
        data6: []
      }
    },
    mounted() {
      for(let i = 0; i < 20; i++) {
        this.data6.push({
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park'
        })
      }
    },
    methods: {
      save() {
        alert(this.msg)
      },
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

<style scoped>

</style>
