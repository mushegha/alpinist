const debug = require('debug')('alp:record:order')

const { Order } = require('bitfinex-api-node/lib/models')

const {
  compose,
  concat,
  toUpper
} = require('ramda')

/**
 * Helpers
 */

const fromPlainSymbol = compose(concat('t'), toUpper)

/**
 * Buy
 *
 * @async
 *
 * @param {Object} client - Ready WebSocket client for Bitfinex
 * @param {Object} params - Options for order
 * @param {string} params.symbol - Plain symbol, like 'btcusd'
 * @param {number} params.amount - Positive to buy negative to sell
 *
 * @return {Promise}
 */

function submit (client, params) {
  const data = {
    cid: Date.now(),
    symbol: fromPlainSymbol(params.symbol),
    amount: params.amount,
    type: 'EXCHANGE MARKET'
  }

  const order = new Order(data, client)

  // Enable automatic updates
  order.registerListeners()

  order.on('error', err => {
    debug('error: %s', err.message)
  })

  order.on('close', (x) => {
    debug('order closed: %s', order.status)
  })

  debug('submitting order %d', order.cid)

  return order
    .submit()
    .catch(err => {
      debug('Declined with error: %s', err.message)
      return Promise.reject(err)
    })
}

module.exports = { submit }
