<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-people" />
              <span>账号管理</span>
            </template>
            <router-link to="/admin/student"><MenuItem name="1-1">学生账号管理</MenuItem></router-link>
            <router-link to="/admin/teacher"><MenuItem name="1-2">教师账号管理</MenuItem></router-link>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-photos" />
              <span>审核管理</span>
            </template>
            <router-link to="/admin/course"><MenuItem name="2-1">课程审核</MenuItem></router-link>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-paper" />
              <span>公告管理</span>
            </template>
            <router-link to="/admin/announcement"><MenuItem name="3-1">公告管理</MenuItem></router-link>
          </Submenu>
          <Submenu name="4">
            <template slot="title">
              <Icon type="ios-people" />
              <span>教学管理</span>
            </template>
            <router-link to="/admin/category"><MenuItem name="4-1">课程类别管理</MenuItem></router-link>
          </Submenu>
          <Submenu name="5">
            <template slot="title">
              <Icon type="ios-people" />
              <span>基础管理</span>
            </template>
            <router-link to="/admin/department"><MenuItem name="5-1">院系管理</MenuItem></router-link>
            <router-link to="/admin/specialty"><MenuItem name="5-2">专业管理</MenuItem></router-link>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar">
          <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"/>
          管理员后台
          <Dropdown style="float: right;margin-right: 40px">
            <a href="javascript:void(0)">
              <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
              <span>{{$store.state.loginManage.userName}}</span>
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem><span @click="logout">退出</span></DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Header>
        <Content :style="{margin: '20px', background: '#fff', minHeight: '830px'}">
          <router-view />
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
    export default {
        name: "index",
      data () {
        return {
          isCollapsed: false
        }
      },
      computed: {
        rotateIcon () {
          return [
            'menu-icon',
            this.isCollapsed ? 'rotate-icon' : ''
          ];
        },
        menuitemClasses () {
          return [
            'menu-item',
            this.isCollapsed ? 'collapsed-menu' : ''
          ]
        }
      },
      methods: {
        collapsedSider () {
          this.$refs.side1.toggleCollapse();
        },
        logout() {
          this.$store.dispatch("loginManage/doLogout").then(() => {
            this.$Notice.info({title:"退出成功", desc: ''})
            this.$router.push("/")
          })
        }
      }
    }
</script>

<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .menu-icon{
    transition: all .3s;
  }
  .rotate-icon{
    transform: rotate(-90deg);
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
</style>
