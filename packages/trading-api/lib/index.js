const debug = require('debug')('alpinist:trading')

const BFX = require('bitfinex-api-node')

const { Order } = require('bitfinex-api-node/lib/models')

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
  const client = new BFX(config)
  const ws = client.ws(2)

  ws.on('error', (err) => {
    console.log(err)
  })

  ws.on('open', () => {
    debug('open')
    ws.auth()
  })

  ws.once('auth', () => {
    debug('authenticated')

    // Build new order
    const o = new Order({
      cid: Date.now(),
      symbol: 'tXRPUSD',
      price: 0.67723,
      amount: 1,
      type: Order.type.MARKET
    }, ws)

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

    o.submit().then(() => {
      debug('got submit confirmation for order %d [%d]', o.cid, o.id)

      // wait a bit...
      setTimeout(() => {
        if (closed) return

        debug('canceling...')

        o.cancel().then(() => {
          debug('got cancel confirmation for order %d', o.cid)
          ws.close()
        }).catch((err) => {
          debug('error cancelling order: %j', err)
          ws.close()
        })
      }, 2000)
    }).catch((err) => {
      console.log(err)
      ws.close()
    })
  })

  ws.open()
  console.log(ws)
}

module.exports = { buy }
