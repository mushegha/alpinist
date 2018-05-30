const PouchDB = require('pouchdb')

const findPlugin = require('pouchdb-find')
const upsertPlugin = require('pouchdb-upsert')

const agentMethods = require('@alpinist/pouchdb-agent-methods')

/**
 * Setup PouchDB
 */

PouchDB
  .plugin(findPlugin)
  .plugin(upsertPlugin)
  .plugin(agentMethods)

/**
 * Store Constructor
 */

function Store () {
  return new PouchDB('http://localhost:5984/agents')
}

/**
 * Expose
 */

module.exports = Store
