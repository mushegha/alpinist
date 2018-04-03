const debug = require('debug')('alp:record')

const { Order } = require('bitfinex-api-node/lib/models')

const { Bitfinex } = require('../clients')

const {
  compose,
  concat,
  toUpper,
  prop,
  head,
  applySpec
} = require('ramda')

/**
 * Helpers
 */

const fromPlainSymbol = compose(concat('t'), toUpper)

const Record = ({ symbol, amount }) => {
  return {
    cid: Date.now(),
    symbol: fromPlainSymbol(symbol),
    amount,
    type: 'EXCHANGE MARKET'
  }
}

const fromOrder = applySpec({
  id     : prop('id'),
  price  : prop('price'),
  amount : prop('amountOrig')
})

/**
 * Connection helpers
 */

async function connect () {
  const client = new Bitfinex()

  const ws = client.ws(2)

  const connect = resolve => {
    ws.once('open', () => {
      debug('Bitfinex socket open')

      ws.once('auth', () => {
        debug('Bitfinex authenticated')
        resolve(ws)
      })

      debug('Auth Bitfinex socket')

      ws.auth()
    })

    debug('Opening Bitfinex socket')

    ws.open()
  }

  return new Promise(connect)
}


/**
 * Submit
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

  const order = new Order(params, client)

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
    .then(fromOrder)
    .catch(err => {
      debug('Declined with error: %s', err.message)
      return Promise.reject(err)
    })
}

/**
 * Worker
 */

module.exports = async function (job) {
  const data = Record(job.data)

  const client = await connect()

  debug('Evaluating order %O', data)

  return submit(client, data)
}
