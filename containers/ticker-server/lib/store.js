const PouchDB = require('pouchdb')

const upsertPlugin = require('pouchdb-upsert')

PouchDB.plugin(upsertPlugin)

function TickerStore () {
  const db = new PouchDB('http://localhost:5984/tickers')

  return db
}

module.exports = TickerStore
