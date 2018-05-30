const findPlugin = require('pouchdb-find')
const upsertPlugin = require('pouchdb-upsert')

const orderMethods = require('./methods')

function install (PouchDB) {
  return PouchDB
    .plugin(findPlugin)
    .plugin(upsertPlugin)
    .plugin(orderMethods)
}

module.exports = install

module.exports.orderMethods = orderMethods
