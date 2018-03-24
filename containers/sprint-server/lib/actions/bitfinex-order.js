const debug = require('debug')('alpinist:order')

const bitfinex = require('../clients/bitfinex')


const symbol = 'tETHUSD'


async function connect () {
  const ws = bitfinex.ws(2)

  return new Promise(resolve => {
    ws.on('error', (err) => {
      debug('Error %s', err.message)
      ws.close()
    })

    ws.on('open', () => {
      debug('Open ws')
      ws.auth()
    })

    ws.once('auth', () => {
      debug('Authenticated')
      resolve(ws)
    })

    ws.open()
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

  const data = {
    cid: Date.now(),
    symbol: symbol,
    amount: params.amount,
    type: 'EXCHANGE MARKET'
  }

  console.log(data)

  return connect()
    .then(ws => {
      const order = new Order(data, ws)

      // Enable automatic updates
      order.registerListeners()

      order.on('error', err => {
        debug('error: %o', err)
      })

      order.on('update', () => {
        debug('order updated: %j', order.serialize())
      })

      order.on('close', (x) => {
        debug('order closed: %s', order.status)
        debug('closing websocket connection')
        ws.close()
      })

      debug('submitting order %d', order.cid)

      return order
        .submit()
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
