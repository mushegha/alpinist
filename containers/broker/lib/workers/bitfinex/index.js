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

module.exports = async (job, cb) => {
  debug('job %s: %O', job.id, job.data)

  const ws = await clientPool.acquire()

  const done = order => {
    debug('Order closed %s', order.cid)
    clientPool.release(ws)
    cb(null, order)
  }

  const fail = err => {
    debug('Error: %s', err.message)
    clientPool.release(ws)
    cb(err)
  }

  submit(ws, job.data)
    .then(done)
    .catch(fail)
}
