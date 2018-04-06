import Axios from 'axios'

import { tap, prop } from 'ramda'

/**
 * Constants
 */

const baseURL = '/api/v1/auth'

/**
 * Remote API
 */

const { post } = Axios.create({ baseURL })

/**
 * Actions
 */

export async function auth ({ commit }, data) {
  const update = tap(data => commit('PUT', data))

  return post('/', data)
    .then(prop('data'))
    .then(update)
}
