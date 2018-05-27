import PouchDB from 'pouchdb'

import findPlugin from 'pouchdb-find'
import upsertPlugin from 'pouchdb-upsert'

import { agentMethods } from '@alpinist/pouchdb-agent-methods'

PouchDB
  .plugin(findPlugin)
  .plugin(upsertPlugin)
  .plugin(agentMethods)

export default new PouchDB('http://localhost:5984/agents')
