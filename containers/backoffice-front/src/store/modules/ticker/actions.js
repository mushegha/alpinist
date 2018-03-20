import Axios from 'axios'

import { tap, prop } from 'ramda'

/**
 * Constants
 */

const baseURL = '/api/v1/ticker'

/**
 * Remote API
 */

const { get } = Axios.create({ baseURL })

/**
 * Actions
 */

/**
 * Fetch ticker data and commit
 *
 * @async
 *
 * @param {Object} store - Vuex store
 * @param {Object} params - Ticker params
 * @param {string} params.provider - Data origin
 * @param {string} params.pair - Symbol
 *
 * @returns {Promise}
 */

export async function fetch ({ commit }, params) {
  const { provider, pair } = params
  const namespace = `${provider}/${pair}`

  const update = data =>
    commit('PUT', data)

  return get(namespace)
    .then(prop('data'))
    .then(tap(update))
}
