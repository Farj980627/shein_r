import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Create',
    component: () => import('../components/CreateClient')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../components/ClientList')
  },
  {
    path: '/edit',
    name: 'Edit',
    component: () => import('../components/EditClient')
  }
  ,
  {
    path: '/createOrder',
    name: 'CreateOrder',
    component: () => import('../components/CreateOrder')
  }
  
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router