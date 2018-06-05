import Vue from 'vue'
import Router from 'vue-router'

import AgentsAll from '@/views/agents-all'
import AgentsNew from '@/views/agents-new'
import AgentsOne from '@/views/agents-one'
import AgentsOneEdit from '@/views/agents-one-edit'

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
    }, {
      path: '/agents/:id/edit',
      name: 'agents-one-edit',
      component: AgentsOneEdit,
      props: true
    },

    {
      path: '/tickers',
      name: 'tickers-all',
      component: TickersAll
    }
  ]
})
