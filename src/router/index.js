import Vue from 'vue'
import VueRouter from 'vue-router'
import Connect4 from '../views/Connect4.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Connect4',
    component: Connect4
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
