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

export async function fetchAllOf ({ commit }, trader) {
  const update = tap(data => commit('PUT', data))

  const params = {
    trader
  }

  return request
    .get('/', { params })
    .then(prop('data'))
    .then(update)
}


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

  const tickerClose = {
    mts: Date.now()
  }

  return request
    .put('/', { tickerClose }, { params })
    .then(prop('data'))
    .then(update)
}
