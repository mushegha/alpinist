import Vue from 'vue'
import Router from 'vue-router'

import ViewDashboard from '@/views/dashboard'
import ViewCreateAgent from '@/views/create-agent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: ViewDashboard
    }, {
      path: '/create-agent',
      name: 'create-agent',
      component: ViewCreateAgent
    }
  ]
})
