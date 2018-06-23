const debug = require('debug')('alpinist:agents')

const getenv = require('getenv')

const PouchDB = require('pouchdb')

const findPlugin = require('pouchdb-find')
const upsertPlugin = require('pouchdb-upsert')

const agentMethods = require('@alpinist/pouchdb-agent-methods')

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
  .plugin(agentMethods)

/**
 * Store Constructor
 */

function Agents () {
  const url = `${POUCHDB_URL}/agents`

  debug('Connecting to CouchDB at %s', url)

  return new PouchDB(url)
}

/**
 * Expose
 */

module.exports = Agents
