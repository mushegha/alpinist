const { Bitfinex } = require('../clients')

const { Order } = require('bitfinex-api-node/lib/models')

/**
 * Acquire WS client
 *
 * @async
 *
 * @returns {Promise<WS>} Connected Bitfinex WS v2 instance
 */


async function acquireWS () {
  const bfx = new Bitfinex()

  const ws = bfx.ws(2)

  return Promise.resolve(ws)
}

/**
 * Expose worker
 */

module.exports = job => {
  const ws = acquireWS()

  return Promise.resolve({ status: 'DONE' })
}
