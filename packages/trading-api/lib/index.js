const debug = require('debug')('alpinist:trading')

const BFX = require('bitfinex-api-node')

const { Order } = require('bitfinex-api-node/lib/models')

function getBalance (config) {
  const client = new BFX(config)
  const rest = client.rest(2)

  rest
    .wallets((err, list) => list)
    .then(console.log)
}


function connect (config) {
  const fx = new BFX(config)
  const ws = fx.ws(2)

  return new Promise(resolve => {
    ws.on('error', (err) => {
      console.log('>', err)
      ws.close()
    })

    ws.on('open', () => {
      debug('open')
      ws.auth()
    })

    ws.once('auth', () => {
      debug('authenticated')
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

function buy (config, params) {
  const data = {
    cid: Date.now(),
    symbol: params.symbol,
    price: params.price,
    amount: params.amount,
    type: 'EXCHANGE MARKET'
  }

  return connect(config)
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
        debug('%O', order)
        debug('order closed: %s', order.status)
        debug('order closed: %s', order.price)
        debug('closing websocket connection')
        ws.close()
      })

      debug('submitting order %d', order.cid)

      return order
        .submit()
    })
    .then(order => {
      debug('got submit confirmation for order %d [%d]', order.cid, order.id)
    //
      return order
    })
    .catch(err => {
      // ws.close()
      return Promise.reject(err)
    })
}

module.exports = {
  buy,
  getBalance
}
