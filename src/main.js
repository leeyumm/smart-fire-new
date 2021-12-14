import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import './css/remove-default.css'
import './css/box.css'
import './css/exclusive.css'
import './css/flex.css'
import './css/table.css'
import './css/button.css'
import './css/badge.css'
import './css/form.css'

import 'font-awesome/css/font-awesome.min.css'

import util from './utils/util'
import http from './api/data-http'
import pageHttp from './api/page-http'

Vue.config.productionTip = false
Vue.prototype.$util = util
Vue.prototype.$http = http
Vue.prototype.$pageHttp = pageHttp




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
