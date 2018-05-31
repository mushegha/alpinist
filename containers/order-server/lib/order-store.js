const PouchDB = require('pouchdb')

const findPlugin = require('pouchdb-find')
const upsertPlugin = require('pouchdb-upsert')

const connectPlugin = require('@alpinist/pouchdb-connect')
const orderMethods = require('@alpinist/pouchdb-order-methods')

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

function Store () {
  return new PouchDB('http://localhost:5984/orders')
}

/**
 * Expose
 */

module.exports = Store
