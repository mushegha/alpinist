import PouchDB from 'pouchdb'

import findPlugin from 'pouchdb-find'
import upsertPlugin from 'pouchdb-upsert'

import connectPlugin from '@alpinist/pouchdb-connect'
import agentMethods from '@alpinist/pouchdb-agent-methods'

PouchDB
  .plugin(findPlugin)
  .plugin(upsertPlugin)
  .plugin(connectPlugin)
  .plugin(agentMethods)

export default new PouchDB('agents')
