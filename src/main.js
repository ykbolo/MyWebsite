import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap'
import './styles/global.scss'
import './styles/common.scss'

import './components'

Vue.prototype._env_ = process.env.NODE_ENV


Vue.config.productionTip = false

new Vue({
  router,
  // store,
  // i18n,
  render: h => h(App)
}).$mount('#app')
