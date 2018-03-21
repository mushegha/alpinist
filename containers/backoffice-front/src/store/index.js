import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

import * as getters from './getters'

Vue.use(Vuex)

const state = {
  scopes: [
    {
      id: 'bitfinex/btcusd',
      data: {
        origin: 'bitfinex',
        symbol: 'btcusd'
      }
    }, {
      id: 'bitfinex/neousd',
      data: {
        origin: 'bitfinex',
        symbol: 'neousd'
      }
    }
  ]
}

const store = new Vuex.Store({
  state,
  modules,
  getters
})

export default store
