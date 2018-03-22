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
    type: Order.type.MARKET
  }

  connect(config)
    .then(ws => {
      const o = new Order(data, ws)

      // Build new order

      let closed = false

      // Enable automatic updates
      o.registerListeners()

      o.on('update', () => {
        debug('order updated: %j', o.serialize())
      })

      o.on('close', () => {
        debug('order closed: %s', o.status)
        closed = true
      })

      debug('submitting order %d', o.cid)

      o.submit()
        .then(() => {
          debug('got submit confirmation for order %d [%d]', o.cid, o.id)
        })
        .catch(err => {
          ws.close()
          return Promise.reject(err)
        })

  })

}

module.exports = {
  buy,
  getBalance
}
