const PouchDB = require('pouchdb')

const getenv = require('getenv')

const { assoc  } = require('ramda')

const { mergeRight } = require('ramda-adjunct')

const { concatMap } = require('rxjs/operators')

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

function through (transaction) {
  const { subject } = transaction

  const db = connect()

  const idWithSubject = assoc('_id', transaction.subject)

  const get = doc =>
    db
      .get(doc.subject)
      .then(mergeRight(doc))
      .catch(_ => idWithSubject(doc))

  const put = doc =>
    db.put(doc)
      .then(res => {
        return assoc('_rev', res.rev, doc)
      })

  return get(transaction)
    .then(put)
}

module.exports = concatMap(through)
