const PouchDB = require('pouchdb')

const { merge } = require('ramda')

const upsertPlugin = require('pouchdb-upsert')
const findPlugin = require('pouchdb-find')

const connectPlugin = require('@alpinist/pouchdb-connect')

const agentMethods = require('@alpinist/pouchdb-agent-methods')

PouchDB
  .plugin(upsertPlugin)
  .plugin(findPlugin)
  .plugin(connectPlugin)
  .plugin(agentMethods)

function Store () {
  return new PouchDB('http://localhost:5984/agents')
}

module.exports = Store
