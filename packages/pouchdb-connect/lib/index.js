const source = require('./source')

/**
 * Expose
 */

module.exports = PouchDB =>
  PouchDB
    .plugin(source)

module.exports.source = source
