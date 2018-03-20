import Vue from 'vue'

import VueRouter from 'vue-router'

import VueRx from 'vue-rx'
import Rx from 'rxjs/Rx'

import App from './app'

import router from './router'

Vue.use(VueRx, Rx)
Vue.use(VueRouter)

new Vue({
  router,
  render: h => h(App),
}).$mount('#body')
