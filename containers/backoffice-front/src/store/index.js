import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

import * as getters from './getters'

Vue.use(Vuex)

const state = {
  scopes: [
    {
      id: 'bitfinex/btcusd',
      query: {
        origin: 'bitfinex',
        symbol: 'btcusd'
      }
    }, {
      id: 'bitfinex/ethusd',
      query: {
        origin: 'bitfinex',
        symbol: 'ethusd'
      }
    }, {
      id: 'bitfinex/neousd',
      query: {
        origin: 'bitfinex',
        symbol: 'neousd'
      }
    }, {
      id: 'mock/exousd',
      query: {
        origin: 'mock',
        symbol: 'exousd'
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
