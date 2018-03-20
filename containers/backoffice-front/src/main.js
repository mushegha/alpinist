import Vue from 'vue'

import Vuex from 'vuex'

import VueRx from 'vue-rx'
import Rx from 'rxjs/Rx'

import VueRouter from 'vue-router'

import { sync } from 'vuex-router-sync'

import App from './app'

import store from './store'
import router from './router'

Vue.use(VueRx, Rx)
Vue.use(VueRouter)

sync(store, router)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#body')
