const PouchDB = require('pouchdb')

const getenv = require('getenv')

const { merge } = require('ramda')

const upsertPlugin = require('pouchdb-upsert')
const findPlugin = require('pouchdb-find')

const methods = require('./methods')
const connect = require('./connect')

PouchDB
  .plugin(upsertPlugin)
  .plugin(findPlugin)
  .plugin(methods)
  .plugin(connect)

function Store () {
  return new PouchDB('http://localhost:5984/orders')
}

module.exports = Store