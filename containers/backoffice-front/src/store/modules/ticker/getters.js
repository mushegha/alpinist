import * as R from 'ramda'

const scope = (state, getters, rootState) => {
  const { provider, pair } = rootState.route.params

  const key = `${provider}/${pair}`
  const val = state[key]

  return val || []
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
