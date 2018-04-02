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

async function connect (ws) {
  const authenticate = () => {
    const perform = (resolve, reject) => {
      ws.once('auth', () => {
        debug('Bitfinex authenticated')
        resolve(ws)
      })

      ws.once('error', err => {
        debug('Error happened: %s', err.message)
        reject(err)
      })

      debug('Auth Bitfinex socket')

      ws.auth()
    }

    return new Promise(perform)
  }

  if (!ws.isAuthenticated()) {
    await authenticate()
  }

  return ws
}


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

async function submit (client, params) {
  const ws = await connect(client)

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
    debug('order closed (details): %O', order)
    debug('order closed (amount): %d', order.amount)
  })

  debug('submitting order %d', order.cid)
  debug('submitting order (details) %O', params)

  return order
    .submit()
    .catch(err => {
      debug('Declined with error: %s', err.message)
      return Promise.reject(err)
    })
}

module.exports = { submit }
