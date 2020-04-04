import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import StudentAccountManage from '@/views/StudentAccountManage/index.vue'
import CategoryManage from '@/views/CategoryManage/index.vue'
import AnnouncementManage from '@/views/AnnouncementManage/index.vue'
import LoginManage from '@/views/LoginManage/index.vue'
import WelcomeManage from '@/views/WelcomeManage/index.vue'
import PageNotFoundManage from '@/views/404Manage/index.vue'
import DepartmentManage from '@/views/DepartmentManage/index.vue'
import SpecialtyManage from '@/views/SpecialtyManage/index.vue'
import TeacherAccountManage from '@/views/TeacherAccountManage/index.vue'
import CourseCheckManage from '@/views/CourseCheckManage/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    //登陆
    {
      path: '/login',
      name: 'loginManage',
      component: LoginManage
    },
    {
      path: '/',
      name: 'loginManage',
      component: LoginManage
    },
    // 后台管理主页
    {
      path: '/admin',
      name: 'Layout',
      component: Layout,
      redirect: '/admin/welcome',
      children: [
        //欢迎界面
        {
          path: 'welcome',
          name: 'WelcomeManage',
          component: WelcomeManage
        },
        //学生账号管理
        {
          path: 'student',
          name: 'StudentAccountManage',
          component: StudentAccountManage
        },
        //教师账号管理
        {
          path: 'teacher',
          name: 'TeacherAccountManage',
          component: TeacherAccountManage
        },
        //课程审核
        {
          path: 'course',
          name: 'CourseCheckManage',
          component: CourseCheckManage
        },
        //类别管理
        {
          path: 'category',
          name: 'CategoryManage',
          component: CategoryManage
        },
        //管理员公告管理
        {
          path: 'announcement',
          name: 'AnnouncementManage',
          component: AnnouncementManage
        },
        //院系管理
        {
          path: 'department',
          name: 'DepartmentManage',
          component: DepartmentManage
        },
        //专业管理
        {
          path: 'specialty',
          name: 'SpecialtyManage',
          component: SpecialtyManage
        },
        /*测试*/
        {
          path: 'loginManage',
          name: 'loginManage',
          component: LoginManage
        }
      ]
    },
    // 404 处理
    {
      path: '/404',
      name: 'PageNotFoundManage',
      component: PageNotFoundManage
    },
    // 404 处理, 此处需特别注意置于最底部
    {
      path: "*",
      redirect: "/404"
    }
  ]
})
