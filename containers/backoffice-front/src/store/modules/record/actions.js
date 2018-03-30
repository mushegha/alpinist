import Axios from 'axios'

import { tap, prop } from 'ramda'

/**
 * Constants
 */

const baseURL = '/api/v1/records'

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
 * @param {Object} trader
 *
 * @returns {Promise}
 */

export async function fetchOpen ({ commit }, trader) {
  const update = tap(data => commit('PUT', data))

  const params = {
    trader,
    status: 'open',
    sort: 'priceInitial'
  }

  return get('/', { params })
    .then(prop('data'))
    .then(tap(update))
}
