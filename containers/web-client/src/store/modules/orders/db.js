import PouchDB from 'pouchdb'

import findPlugin from 'pouchdb-find'
import upsertPlugin from 'pouchdb-upsert'

import connectPlugin from '@alpinist/pouchdb-connect'
import orderMethods from '@alpinist/pouchdb-order-methods'

PouchDB
  .plugin(findPlugin)
  .plugin(upsertPlugin)
  .plugin(connectPlugin)
  .plugin(orderMethods)

const options = {
  auto_compaction: true,
  revs_limit: 8
}

export default new PouchDB('orders', options)
