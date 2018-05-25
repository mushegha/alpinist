import {
  tap
} from 'ramda'

import PouchDB from 'pouchdb'

import findPlugin from 'pouchdb-find'
import upsertPlugin from 'pouchdb-upsert'

import agentMethods from '@alpinist/agent-store/lib/methods'

PouchDB
  .plugin(findPlugin)
  .plugin(upsertPlugin)
  .plugin(agentMethods)

const db = new PouchDB('http://localhost:5984/agents')

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
