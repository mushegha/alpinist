const PouchDB = require('pouchdb')

const getenv = require('getenv')

const {
  assoc,
  compose
} = require('ramda')

const {
  mergeRight
} = require('ramda-adjunct')

/**
 * Helpers
 */

/**
 * Connection settings
 */

const connect = () => {
  const host = getenv('COUCHDB_HOST', 'http://localhost')
  const port = getenv.int('COUCHDB_PORT', 5984)

  const uri = `${host}:${port}/transactions`

  return new PouchDB(uri)
}

function put (transaction) {
  const { subject } = transaction

  const db = connect()

  const get = doc =>
    db.get(doc.subject)
      .catch(_ => doc)
      .then(assoc('_id', doc.subject))
      .then(mergeRight(doc))

  const put = doc =>
    db.put(doc)
      .then(_ => doc)

  return get(transaction)
    .then(put)
}

module.exports = put
