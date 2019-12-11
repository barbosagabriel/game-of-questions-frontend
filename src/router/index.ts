import Vue from 'vue'
import VueRouter from 'vue-router'
import { Login } from '../views'

Vue.use(VueRouter)

const routes = [
  {
    path: '/room/:id',
    name: 'room',
    props: true,
    component: () => import('../views/Room.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      layout: 'blank'
    },
    component: Login
  },
  {
    path: '/new-room',
    name: 'New room',
    meta: {
      layout: 'blank'
    },
    component: () => import('../views/NewRoom.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
