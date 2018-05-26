const findPlugin = require('pouchdb-find')
const upsertPlugin = require('pouchdb-upsert')

const agentMethods = require('./methods')

/**
 * Expose
 */

module.exports = PouchDB =>
  PouchDB
    .plugin(findPlugin)
    .plugin(upsertPlugin)
    .plugin(agentMethods)

module.exports.agentMethods = agentMethods
