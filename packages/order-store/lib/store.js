const PouchDB = require('pouchdb')

const upsertPlugin = require('pouchdb-upsert')
const findPlugin = require('pouchdb-find')

const getenv = require('getenv')

const { merge } = require('ramda')

const COUCHDB_CONFIG = getenv.multi({
  host : ['COUCHDB_HOST', 'localhost'],
  port : ['COUCHDB_PORT', 5984, 'int'],
})

const urlFrom = (opts = {}) => {
  const { host, port } = merge(COUCHDB_CONFIG, opts)
  return `http://${host}:${port}/orders`
}

PouchDB.plugin(upsertPlugin)
PouchDB.plugin(findPlugin)

function Store (opts) {
  const url = urlFrom(opts)
  const db = new PouchDB(url)

  db.createIndex({
    index: {
      fields: [
        'status',
        'timestamp'
      ]
    }
  })

  return db
}

module.exports = Store
