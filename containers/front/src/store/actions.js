import {
  tap
} from 'ramda'

/**
 * Actions
 */

function fetchAgents ({ commit }) {
  const agents = [
    {
      id: 'a1',
      broker: 'bitfinex',
      symbol: 'ethusd'
    }, {
      id: 'a2',
      broker: 'cexio',
      symbol: 'btcusd'
    }
  ]

  const setAgents = agents =>
    commit('SET_AGENT_LIST', agents)

  return Promise
    .resolve(agents)
    .then(tap(setAgents))
}

/**
 * Expose
 */

export {
  fetchAgents
}
