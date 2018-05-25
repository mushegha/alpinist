import PouchDB from 'pouchdb'

import findPlugin from 'pouchdb-find'

import {
  map,
  prop
} from 'ramda'

import {
  renameKeys
} from 'ramda-adjunct'

PouchDB.plugin(findPlugin)

const db = new PouchDB('http://localhost:5984/agents')

/**
 * Helpers
 */

const recover = renameKeys({
  _id: 'id',
  _rev: 'rev'
})

/**
 * Methods
 */

function findAll () {
  const selector = {}

  return db
    .find({ selector })
    .then(prop('docs'))
    .then(map(recover))
}

function create (payload) {
  return db
    .post(payload)
}

export {
  findAll,
  create
}
