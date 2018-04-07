const debug = require('debug')('alp:broker:bitfinex')

const { Order } = require('bitfinex-api-node/lib/models')

const wsPool = require('./pool')


/**
 * Expose worker
 */

module.exports = async job => {
  debug('job %s', job.id)
  const ws = await wsPool.acquire()

  return new Promise(resolve => {
    setTimeout(async () => {
      debug('job done %s', job.id)
      await wsPool.release(ws)
      resolve({ exo: 'done' })
    }, 1000)
  })
}
