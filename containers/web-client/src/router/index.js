import Vue from 'vue'
import Router from 'vue-router'

import AgentsAll from '@/views/agents-all'
import AgentsNew from '@/views/agents-new'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'agents-all' }
    }, {
      path: '/agents',
      name: 'agents-all',
      component: AgentsAll
    }, {
      path: '/agents/new',
      name: 'agents-new',
      component: AgentsNew
    }
  ]
})
