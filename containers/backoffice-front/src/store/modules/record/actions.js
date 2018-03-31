import Axios from 'axios'

import { tap, prop } from 'ramda'

/**
 * Constants
 */

const baseURL = '/api/v1/records'

/**
 * Remote API
 */

const request = Axios.create({ baseURL })

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

  return request
    .get('/', { params })
    .then(prop('data'))
    .then(tap(update))
}

export async function destroyAllOf ({ commit }, trader) {
  const update = tap(_ => commit('PUT', []))

  const params = {
    trader,
    status: 'open'
  }

  return request
    .delete('/', { params })
    .then(prop('data'))
    .then(update)
}
