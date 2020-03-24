import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import StudentAccountManage from '@/views/StudentAccountManage/index.vue'
import CategoryManage from '@/views/CategoryManage/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: '/student',
      children: [
        //学生账号管理
        {
          path: '/student',
          name: 'StudentAccountManage',
          component: StudentAccountManage
        },
        //类别管理
        {
          path: '/category',
          name: 'CategoryManage',
          component: CategoryManage
        }
      ]
    }
  ]
})
