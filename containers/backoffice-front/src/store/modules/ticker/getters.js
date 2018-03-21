import * as R from 'ramda'

const scope = (state, getters, rootState) => {
  const { origin, symbol } = rootState.route.query

  const key = `${origin}/${symbol}`

  return state[key] || []
}

const last = (state, getters) =>
  R.last(getters.scope)

const prev = (state, getters) =>
  R.nth(-2, getters.scope)

/**
 * Expose
 */

export {
  scope,
  last,
  prev
}
