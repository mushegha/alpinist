const debug = require('debug')('alpinist:agents')

const getenv = require('getenv')

const PouchDB = require('pouchdb')

const findPlugin = require('pouchdb-find')
const upsertPlugin = require('pouchdb-upsert')

const connectPlugin = require('@alpinist/pouchdb-connect')
const orderMethods = require('@alpinist/pouchdb-order-methods')

/**
 * Settings
 */

const POUCHDB_URL = getenv('COUCHDB_URL', 'http://localhost:5984')

/**
 * Setup PouchDB
 */

PouchDB
  .plugin(findPlugin)
  .plugin(upsertPlugin)
  .plugin(connectPlugin)
  .plugin(orderMethods)

/**
 * Store Constructor
 */

function Orders () {
  const url = `${POUCHDB_URL}/orders`

  debug('Connecting to CouchDB at %s', url)

  return new PouchDB(url)
}

/**
 * Expose
 */

module.exports = Orders
