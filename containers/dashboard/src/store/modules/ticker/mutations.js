import Vue from 'vue'

/**
 * Mutations
 */

export function PUT (state, data) {
  Vue.set(state, 'bid', data.bid)
  Vue.set(state, 'ask', data.ask)
}
