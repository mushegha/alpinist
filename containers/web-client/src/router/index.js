import Vue from 'vue'
import Router from 'vue-router'

import AgentsAll from '@/views/agents-all'
import AgentsOne from '@/views/agents-one'
import AgentsNew from '@/views/agents-new'

import TickersAll from '@/views/tickers-all'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'agents-all' }
    },

    {
      path: '/agents',
      name: 'agents-all',
      component: AgentsAll
    }, {
      path: '/agents/new',
      name: 'agents-new',
      component: AgentsNew
    }, {
      path: '/agents/:id',
      name: 'agents-one',
      component: AgentsOne,
      props: true
    },

    {
      path: '/tickers',
      name: 'tickers-all',
      component: TickersAll
    }
  ]
})
