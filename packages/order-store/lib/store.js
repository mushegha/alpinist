const PouchDB = require('pouchdb')

const upsertPlugin = require('pouchdb-upsert')

const getenv = require('getenv')

const { merge } = require('ramda')

PouchDB.plugin(upsertPlugin)

const COUCHDB_CONFIG = getenv.multi({
  host : ['COUCHDB_HOST', 'localhost'],
  port : ['COUCHDB_PORT', 5984, 'int'],
})

const urlFrom = (opts = {}) => {
  const { host, port } = merge(COUCHDB_CONFIG, opts)
  return `http://${host}:${port}/orders`
}

function Store (opts) {
  const url = urlFrom(opts)
  const db = new PouchDB(url)

  return db
}

module.exports = Store
