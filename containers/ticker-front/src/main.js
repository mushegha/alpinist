import Vue from 'vue'

import Rx from 'rxjs/Rx'
import VueRx from 'vue-rx'

import App from './app'

Vue.use(VueRx, Rx)

new Vue({
  render: h => h(App)
}).$mount('#body')
