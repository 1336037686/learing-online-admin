<template>
  <Row style="margin: 20px">
    <!--面包屑-->
    <Breadcrumb>
      <BreadcrumbItem>
        <Icon type="ios-home-outline"/>
        主页
      </BreadcrumbItem>
      <BreadcrumbItem>审核管理</BreadcrumbItem>
      <BreadcrumbItem>课程审核</BreadcrumbItem>
    </Breadcrumb>
    <!--操作按钮-->
    <Row style="margin-top: 20px;background:#eee;padding: 20px">
      <Col span="1" offset="1"><span style="font-size: 20px">筛选:</span></Col>
      <Col span="4">
        <Input v-model="formItem.selectContent" placeholder="输入关键字"/>
      </Col>
      <Col span="2" style="margin-left: 10px">
        <Button type="primary" @click="search">查找</Button>
      </Col>
    </Row>
    <!--表格-->
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table border :columns="courseTable" :data="$store.state.courseManage.courseData.pageInfo.list">
          <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看简介</Button>
            <Button type="success" size="small" @click="pass(index)">通过</Button>
            <Button type="error" size="small" @click="fail(index)">驳回</Button>
          </template>
        </Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="$store.state.courseManage.courseData.pageInfo.total" :current="currentPage" :page-size="$store.state.courseManage.size" show-total @on-change="nextPage"/>
          </div>
        </div>
      </Col>
    </Row>

    <!--查看公告-->
    <Modal v-model="showModelState" fullscreen title="Fullscreen Modal">
      <p slot="header" style="text-align:center">
        <span v-html="showModelForm.title"/>
      </p>
      <div>
        <div style="margin: 20px" v-html="showModelForm.content"></div>
      </div>
      <div slot="footer"/>
    </Modal>
  </Row>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        currentPage: 1,
        formItem: {
          selectContent: ''
        },
        modelForm: {
          title: '',
          content: ''
        },
        showModelForm: {
          title: '',
          content: ''
        },
        addModelState: false,
        showModelState: false,
        updateModelState: false,
        courseTable: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '课程号',
            key: 'id'
          },
          {
            title: '课程名称',
            key: 'name'
          },
          {
            title: '课程类别',
            key: 'categoryName'
          },
          {
            title: '课程封面',
            key: 'cover',
            align: 'center',
            width: 110,
            render: (h, params) => {
              return h('img', {
                attrs: {
                  src: params.row.cover,
                }
              });
            }
          },
          {
            title: '任课老师',
            key: 'teacherName'
          },
          {
            title: '申请时间',
            key: 'time'
          },
          {
            title: '审核状态',
            key: 'checkState',
            render: (h, params) => {
              return h('span', params.row.checkState == 0 ? "未审核" : "已审核");
            }
          },
          {
            title: '操作',
            slot: 'action',
            width: 300,
            align: 'center'
          }
        ]
      }
    },
    mounted() {
      // 请求列表
      this.$store.dispatch("courseManage/doQueryAll", 1)
    },
    methods: {
      search() {

      },
      nextPage(index) {

      },
      show (index) {
        let data = this.$store.state.courseManage.courseData.pageInfo.list[index]
        this.showModelForm.title = data.name
        this.showModelForm.content = data.intro
        this.showModelState = true
      },
      pass(index) {
        let data = this.$store.state.courseManage.courseData.pageInfo.list[index]
        data.checkState = 1
        this.$store.dispatch("courseManage/doUpdate", {"data": data, "currentPage": this.currentPage})
      },
      fail(index) {
        let data = this.$store.state.courseManage.courseData.pageInfo.list[index]
        data.checkState = 2
        this.$store.dispatch("courseManage/doUpdate", {"data": data, "currentPage": this.currentPage})
      }
    }
  }
</script>

<style scoped>

</style>
