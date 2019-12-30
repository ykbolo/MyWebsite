import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap'
import './styles/global.scss'
import './styles/common.scss'

import './components'


Vue.config.productionTip = false

new Vue({
  router,
  // store,
  // i18n,
  render: h => h(App)
}).$mount('#app')
