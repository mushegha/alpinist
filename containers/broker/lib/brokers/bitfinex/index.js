const debug = require('debug')('alp:broker:bitfinex')

const { tap } = require('ramda')

const ClientPool = require('./pool')

const { submit } = require('./actions')

/**
 * Init pool
 */

const clientPool = new ClientPool()

/**
 * Expose worker
 */

module.exports = async job => {
  debug('job %s: %O', job.id, job.data)

  const ws = await clientPool.acquire()

  const done = tap(
    order => {
      debug('Order closed %s', order.cid)
      clientPool.release(ws)
    }
  )

  const fail = tap(
    err => {
      debug('Error: %s', err.message)
      clientPool.release(ws)
    }
  )

  return submit(ws, job.data)
    .then(done)
    .catch(fail)
}
