const {
  is,
  merge
} = require('ramda')

const PouchDB = require('pouchdb')

const upsertPlugin = require('pouchdb-upsert')
const findPlugin = require('pouchdb-find')

const connectPlugin = require('@alpinist/pouchdb-connect')

const agentMethods = require('@alpinist/pouchdb-agent-methods')

const {
  getBaseURL
} = require('./helpers')

PouchDB
  .plugin(upsertPlugin)
  .plugin(findPlugin)
  .plugin(connectPlugin)
  .plugin(agentMethods)

function AgentStore (opts = {}) {
  if (is(String, opts)) {
    opts = { dbName: opts }
  }

  const {
    baseURL = getBaseURL(),
    dbName  = 'agents'
  } = opts

  const uri = baseURL
    ? `${baseURL}/${dbName}`
    : dbName

  return new PouchDB(uri)
}

module.exports = AgentStore
