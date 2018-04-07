const debug = require('debug')('alp:broker:bitfinex')

const { Order } = require('bitfinex-api-node/lib/models')

const ClientPool = require('./pool')

/**
 * Init pool
 */

const clientPool = new ClientPool()

/**
 * Expose worker
 */

module.exports = async job => {
  debug('job %s', job.id)
  const ws = await clientPool.acquire()

  return new Promise(resolve => {
    setTimeout(async () => {
      debug('job done %s', job.id)
      await clientPool.release(ws)
      resolve({ exo: 'done' })
    }, 1000)
  })
}
