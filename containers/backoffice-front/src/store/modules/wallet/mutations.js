import Vue from 'vue'

import { toPairs } from 'ramda'

export function PUT (state, data) {
  const pairs = toPairs(data)

  const set = pair => {
    const [ key, val ] = pair
    Vue.set(state, key, val)
  }

  pairs.forEach(set)
}
