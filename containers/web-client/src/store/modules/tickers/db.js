import PouchDB from 'pouchdb'

import findPlugin from 'pouchdb-find'
import upsertPlugin from 'pouchdb-upsert'

import connectPlugin from '@alpinist/pouchdb-connect'

PouchDB
  .plugin(findPlugin)
  .plugin(upsertPlugin)
  .plugin(connectPlugin)

const options = {
  auto_compaction: true,
  revs_limit: 5
}

export default new PouchDB('tickers', options)
