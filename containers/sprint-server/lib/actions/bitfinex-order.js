const debug = require('debug')('alpinist:order')

const bitfinex = require('../clients/bitfinex')

const { Order } = require('bitfinex-api-node/lib/models')

const symbol = 'tETHUSD'


async function connect () {
  const ws = bitfinex.ws(2)

  return new Promise(resolve => {
    ws.once('auth', () => {
      debug('Authenticated')
      resolve(ws)
    })

    ws.auth()
  })
}

/**
 * Buy
 *
 * @async
 *
 * @param {Object} config - Options for BFX constructor
 * @param {string} config.apiKey
 * @param {string} config.apiSecret
 * @param {Object} params - Options for order
 * @param {string} params.symbol
 * @param {number} params.amount
 * @param {number} params.price
 *
 * @return {Promise}
 */

function submitOrder (params) {
  const ws = bitfinex.ws(2)

  const data = {
    cid: Date.now(),
    symbol: symbol,
    amount: params.amount,
    type: 'EXCHANGE MARKET'
  }

  return connect()
    .then(ws => {
      const order = new Order(data, ws)

      console.log(order)

      // Enable automatic updates
      order.registerListeners()

      order.on('error', err => {
        debug('error: %s', err.message)
      })

      order.on('close', (x) => {
        debug('order closed: %s', order.status)
      })

      debug('submitting order %d', order.cid)

      return order.submit()
    })
    .catch(err => {
      debug('Declined with error: %s', err.message)
      ws.close()
      return Promise.reject(err)
    })
}

module.exports = {
  submitOrder
}
