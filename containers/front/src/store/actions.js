import {
  tap
} from 'ramda'

import { Agents } from '@/db'

/**
 * Actions
 */

function fetchAgents ({ commit }) {
  const setAgents = agents =>
    commit('SET_AGENT_LIST', agents)

  return Agents
    .findAll()
    .then(tap(setAgents))
}

function createAgent ({ commit }, payload) {
  return Agents.create(payload)
}

/**
 * Expose
 */

export {
  fetchAgents,
  createAgent
}
