import db from './db'

/**
 * Actions
 */

function sync ({ commit }, opts = {}) {
  const { since = 0, live = true } = opts

  return db
    .source({ since, live })
    .subscribe(x => commit('SET_AGENT', x))
}

function create ({ commit }, payload) {
  return db
    .putAgent(payload)
}

/**
 * Expose
 */

export {
  sync,
  create
}
