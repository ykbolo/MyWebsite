import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_PATH,
  routes: routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
