import Axios from 'axios'

import { tap, prop } from 'ramda'

/**
 * Constants
 */

const baseURL = '/api/v1/wallet'

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
 * @param {string} params.origin - Exchange or provider
 * @param {string} params.symbol - Ticker symbol
 *
 * @returns {Promise}
 */

export async function fetch ({ commit }, params) {
  const update = data =>
    commit('PUT', data)

  return get('/')
    .then(prop('data'))
    .then(tap(update))
}
