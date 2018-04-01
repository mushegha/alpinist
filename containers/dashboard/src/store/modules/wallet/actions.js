import Axios from 'axios'

import { tap, prop } from 'ramda'

/**
 * Constants
 */

const baseURL = '/api/v1/wallets'

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
 *
 * @returns {Promise}
 */

export async function fetch ({ commit }) {
  const update = tap(data => commit('PUT', data))

  return get('/exchange')
    .then(prop('data'))
    .then(update)
}
