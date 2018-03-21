import Vue from 'vue'

import {
  append,
  compose,
  equals,
  evolve,
  flip,
  prop,
  takeLastWhile,
  uniqBy
} from 'ramda'

/**
 * Settings
 */

const MAX_TIME = 3 * 60 * 1e3 // 3 minutes

/**
 * Helpers
 */

const appendTo = flip(append)

const time = t => new Date(t)

const isStale = ({ time }) =>
  Date.now() - time < MAX_TIME

/**
 * Mutations
 */

export function PUT (state, payload) {
  const { origin, symbol } = payload

  const key = `${origin}/${symbol}`

  const push = compose(
    takeLastWhile(isStale),
    uniqBy(prop('id')),
    appendTo(state[key] || []),
    evolve({ time })
  )

  const data = push(payload)

  // update only if updated
  if (!equals(state[key], data))
    Vue.set(state, key, data)
}
