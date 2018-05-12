const debug = require('debug')('alpinist:order-queue:bitfinex')

const { Order } = require('bitfinex-api-node/lib/models')

const ClientPool = require('./pool')

const { convert, recover } = require('./helpers')

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

  const order = new Order(convert(job.data))

  // success handler

  const success = () => {
    debug('Order closed: %s', order.status)
    job.log(order.status)

    clientPool.release(ws)
    cb(null, recover(order))
  }

  // failure handler

  const fail = err => {
    debug('Error: %s', err.message)
    clientPool.release(ws)
    cb(err)
  }

  // ops

  order.registerListeners(ws)

  order.once('close', success)

  order
    .submit()
    .catch(fail)
}
