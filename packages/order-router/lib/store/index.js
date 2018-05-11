const PouchDB = require('pouchdb')

const findPlugin = require('pouchdb-find')

const getenv = require('getenv')

/**
 * Setup
 */

PouchDB.plugin(findPlugin)

/**
 * Settings
 */

const COUCHDB_URL = getenv('COUCHDB_URL', 'http://localhost:5984')

const index = {
  fields: [
    'status',
    'timestamp'
  ]
}

function createMiddleware () {
  const url = `${COUCHDB_URL}/orders`
  const store = new PouchDB(url)

  store.createIndex(index)

  return async (ctx, next) => {
    ctx.store = store

    return next()
  }
}

module.exports = createMiddleware
