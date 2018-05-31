// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import VueRx from 'vue-rx'
import { Observable } from 'rxjs/Rx'

import ElementUI from 'element-ui'

import App from './App'

import router from './router'
import store from './store'

import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI, { locale })

Vue.use(VueRx, { Observable })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

store.dispatch('agents/sync')
store.dispatch('orders/sync')
// store.dispatch('tickers/sync')
