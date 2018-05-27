import {
  tap
} from 'ramda'

import db from './db'

/**
 * Actions
 */

function fetchAgents ({ commit }) {
  const setAgents = agents =>
    commit('SET_AGENT_LIST', agents)

  return db
    .getAllAgents()
    .then(tap(setAgents))
}

function createAgent ({ commit }, payload) {
  return db
    .putAgent(payload)
}

/**
 * Expose
 */

export {
  fetchAgents,
  createAgent
}
