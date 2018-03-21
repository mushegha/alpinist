import Vue from 'vue'

import {
  filter,
  whereEq,
  pick,
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
  const spec = pick(['origin', 'symbol'], payload)

  const push = compose(
    // TODO: remove
    // takeLastWhile(isStale),
    filter(whereEq(spec)),
    uniqBy(prop('id')),
    appendTo(state),
    evolve({ time })
  )

  const data = push(payload)

  // update only if updated
  if (!equals(state, data))
    state.splice(0, state.length, ...data)
}

export function ERASE (state) {
  state.splice(0, state.length)
}
