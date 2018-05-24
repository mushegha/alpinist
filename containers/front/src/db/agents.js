import PouchDB from 'pouchdb'

import findPlugin from 'pouchdb-find'

import {
  prop
} from 'ramda'

PouchDB.plugin(findPlugin)

const db = new PouchDB('http://localhost:5984/agents')

function findAll () {
  const selector = {}

  return db
    .find({ selector })
    .then(prop('docs'))
}

export {
  findAll
}
