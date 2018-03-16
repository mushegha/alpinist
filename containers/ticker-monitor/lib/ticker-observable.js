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
  async function fromCursor (observer) {
    const cursor = await getCursor(pred, conn)

    const emit = (err, row) =>
      err
        ? observer.error(err)
        : observer.next(row)

    cursor.each(emit)

    return () => cursor.close()
  }

  return Observable.create(fromCursor)
}

/**
 * Expose curried
 */

module.exports = curryN(2, observe)
