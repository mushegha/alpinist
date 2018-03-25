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
  uniqBy,
  toPairs
} from 'ramda'

/**
 * Settings
 */

const MAX_TIME = 3 * 60 * 1e3 // 3 minutes

/**
 * Helpers
 */

const time = t => new Date(t)

/**
 * Mutations
 */

export function PUT (state, data) {
  toPairs(data).forEach(([key, value]) => {
    Vue.set(state, key, value)
  })
}
