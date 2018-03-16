const debug = require('debug')('monitor:cursor')

const rt = require('rethinkdb')
const { Observable } = require('rxjs')
const { curryN } = require('ramda')

/**
 * Etc.
 */

const descTimestamp = {
  index: rt.desc('timestamp')
}

/**
 * Helpers
 */

const getCursor = (pred, conn) =>
  rt.db('alpinist')
    .table('ticker')
    .orderBy(descTimestamp)
    .filter(pred)
    .limit(1)
    .changes()
    .run(conn)

/**
 * Ticker stream
 *
 */

function observe (pred, conn) {

  function fromCursor (observer) {
    const emit = (err, row) =>
      err
        ? observer.error(err)
        : observer.next(row)

    getCursor(pred, conn)
      .then(cursor => {
        cursor.each(emit)
      })

    return () => {
      debug('closing connection')
      conn.close()
    }
  }

  return Observable.create(fromCursor)
}

/**
 * Expose curried
 */

module.exports = curryN(2, observe)
