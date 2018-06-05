import Vue from 'vue'
import Vuex from 'vuex'

import * as modules from './modules'

Vue.use(Vuex)

const state = { }

const store = new Vuex.Store({
  state,
  modules
})

export default store
