import Vue from 'vue'

import {
  takeLast,
  append,
  compose,
  flip
} from 'ramda'

/**
 * Helpers
 */

const appendTo = flip(append)

/**
 * Mutations
 */

export function PUT (state, payload) {
  const { provider, pair } = payload

  const key = `${provider}/${pair}`

  const push = compose(
    takeLast(100),
    appendTo(state[key] || [])
  )

  Vue.set(state, key, push(payload))
}
