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
  ,
  {
    path: '/createDeliveryman',
    name: 'CreateDeliveryman',
    component: () => import('../components/CreateDeliveryman')
  },
  {
    path: '/listDeliveryman',
    name: 'ListDeliveryman',
    component: () => import('../components/DeliverymanList')
  },
  {
    path: '/editDeliveryman',
    name: 'EditDeliveryman',
    component: () => import('../components/EditDeliveryman')
  }
  ,
  {
    path: '/assignDelivery',
    name: 'AssignDelivery',
    component: () => import('../components/AssignDelivery')
  }
  ,
  {
    path: '/reports',
    name: 'Reports',
    component: () => import('../components/Reports')
  }
  ,
  {
    path: '/pdfs',
    name: 'Pdfs',
    component: () => import('../components/Pdfs')
  }
  ,
  {
    path: '/createUser',
    name: 'CreateUser',
    component: () => import('../components/CreateUser')
  },
  {
    path: '/login',
    name: 'Log-In',
    component: () => import('../components/Log-in')
  },
  {
    path: '/downloadDelivery',
    name: 'Descargar Entregas',
    component: () => import('../components/DownloadDelivery')
  }
  
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router