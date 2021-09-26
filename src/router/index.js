import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/index.vue'
import Home from '@/views/home/index.vue'
import Article from '@/views/article/index.vue'
import LayOut from '@/views/layout/index.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: LayOut,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 导航守卫
// 功能：实现非登录页面都需要有登录认证，否则跳转到首页
router.beforeEach(function (to, from, next) {
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (to.path === '/login') {
    // 登录页面
    next()
  } else {
    // 非登录页面
    // console.log(user)
    if (user) {
      // 有登录认证
      next()
    } else {
      // 没有登录认证 跳转到登录页面
      next('/login')
    }
  }
  next()
})

export default router
