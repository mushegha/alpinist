import Axios from 'axios'

import { tap, prop } from 'ramda'

/**
 * Constants
 */

const baseURL = '/api/v1/traders'

/**
 * Remote API
 */

const request = Axios.create({ baseURL })

/**
 * Actions
 */

export async function fetchAll () {
  return request
    .get('/')
    .then(prop('data'))
}

export async function fetchOne ({ commit }, id) {
  const update = tap(data => commit('PUT', data))

  return request
    .get(`/${id}`)
    .then(prop('data'))
    .then(update)
}

export async function createOne ({ commit }, payload) {
  return request
    .post('/', payload)
    .then(prop('data'))
}

export async function updateOne ({ commit }, payload) {
  const uri = `/${payload.id}`
  return request
    .put(uri, payload)
    .then(prop('data'))
}

export async function destroyOne ({ commit }, id) {
  const uri = `/${id}`


  return request
    .delete(uri)
    .then(prop('data'))
}
