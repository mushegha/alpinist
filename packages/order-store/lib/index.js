const PouchDB = require('pouchdb')

const getenv = require('getenv')

const { merge } = require('ramda')

const upsertPlugin = require('pouchdb-upsert')
const findPlugin = require('pouchdb-find')

const methods = require('./methods')

PouchDB
  .plugin(upsertPlugin)
  .plugin(findPlugin)
  .plugin(methods)

function Store (opts) {
  const db = new PouchDB('http://localhost:5984/orders')

  return db
}

module.exports = Store
