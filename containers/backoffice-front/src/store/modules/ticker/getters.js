import * as R from 'ramda'

const history = (state, getters, rootState) => {
  const { origin, symbol } = rootState.route.query

  const key = `${origin}/${symbol}`

  return state[key] || []
}

const last = (state, getters) =>
  R.last(getters.history)

const prev = (state, getters) =>
  R.nth(-2, getters.history)

/**
 * Expose
 */

export {
  history,
  last,
  prev
}
