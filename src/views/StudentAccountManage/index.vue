<template>
    <Row style="margin: 20px">
      <!--面包屑-->
      <Breadcrumb>
        <BreadcrumbItem><Icon type="ios-home-outline"></Icon> 主页</BreadcrumbItem>
        <BreadcrumbItem>账号管理</BreadcrumbItem>
        <BreadcrumbItem>学生账号管理</BreadcrumbItem>
      </Breadcrumb>
      <!--操作按钮-->
      <Row  style="margin: 20px">
        <Col span="2">
          <Button type="primary" icon="ios-cloud-done-outline" @click="addModelState = true">添加账号</Button>
        </Col>
        <Col span="2">
          <Button type="error" icon="ios-close">删除账号</Button>
        </Col>
        <Col span="6">
          <Input search placeholder="Enter something..." />
        </Col>
      </Row>
      <!--表格-->
      <Row style="margin: 20px">
        <Col span="24">
          <Table border ref="selection" :columns="columns4" :data="data1"></Table>
        </Col>

      </Row>
      <!--分页-->
      <Row style="margin: 20px">
        <Col span="8" offset="8">
          <Page :total="40" show-total />
        </Col>
      </Row>

      <!--弹框-->
      <Modal title="Title" v-model="addModelState" :mask-closable="false">
        <Form :model="formItem" :label-width="80">
          <FormItem label="Input">
            <Input v-model="formItem.input" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="Select">
            <Select v-model="formItem.select">
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </FormItem>
          <FormItem label="DatePicker">
            <Row>
              <Col span="11">
                <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
              </Col>
              <Col span="2" style="text-align: center">-</Col>
              <Col span="11">
                <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="Radio">
            <RadioGroup v-model="formItem.radio">
              <Radio label="male">Male</Radio>
              <Radio label="female">Female</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="Checkbox">
            <CheckboxGroup v-model="formItem.checkbox">
              <Checkbox label="Eat"></Checkbox>
              <Checkbox label="Sleep"></Checkbox>
              <Checkbox label="Run"></Checkbox>
              <Checkbox label="Movie"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="Switch">
            <i-switch v-model="formItem.switch" size="large">
              <span slot="open">On</span>
              <span slot="close">Off</span>
            </i-switch>
          </FormItem>
          <FormItem label="Slider">
            <Slider v-model="formItem.slider" range></Slider>
          </FormItem>
          <FormItem label="Text">
            <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem>
            <Button type="primary">Submit</Button>
            <Button style="margin-left: 8px">Cancel</Button>
          </FormItem>
        </Form>
      </Modal>
    </Row>
</template>

<script>
    export default {
        name: "index",
      data () {
        return {
          formItem: {
            input: '',
            select: '',
            radio: 'male',
            checkbox: [],
            switch: true,
            date: '',
            time: '',
            slider: [20, 50],
            textarea: ''
          },
          addModelState: false,
          columns4: [
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              title: 'Name',
              key: 'name'
            },
            {
              title: 'Age',
              key: 'age'
            },
            {
              title: 'Address',
              key: 'address'
            }
          ],
          data1: [
            {
              name: 'John Brown',
              age: 18,
              address: 'New York No. 1 Lake Park',
              date: '2016-10-03'
            },
            {
              name: 'Jim Green',
              age: 24,
              address: 'London No. 1 Lake Park',
              date: '2016-10-01'
            },
            {
              name: 'Joe Black',
              age: 30,
              address: 'Sydney No. 1 Lake Park',
              date: '2016-10-02'
            },
            {
              name: 'Jon Snow',
              age: 26,
              address: 'Ottawa No. 2 Lake Park',
              date: '2016-10-04'
            }
          ]
        }
      },
      methods: {
        handleSelectAll (status) {
          this.$refs.selection.selectAll(status);
        }
      }
    }
</script>

<style scoped>

</style>
