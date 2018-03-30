import Axios from 'axios'

import { tap, prop } from 'ramda'

/**
 * Constants
 */

const baseURL = '/api/v1/traders'

/**
 * Remote API
 */

const { get } = Axios.create({ baseURL })

/**
 * Actions
 */

export async function fetchAll () {
  return get('/').then(prop('data'))
}

export async function fetch ({ commit }) {
  const update = tap(data => commit('PUT', data))

  return get('/exchange')
    .then(prop('data'))
    .then(update)
}
