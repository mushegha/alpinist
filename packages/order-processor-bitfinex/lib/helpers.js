const {
  compose,
  concat,
  drop,
  toLower,
  toUpper
} = require('ramda')

/**
 * To Bitfinex symbol notation
 *
 * @param {string} symbol - Standard notation
 *
 * @example
 *    // > 'tBTCUSD'
 *    fromPlainSymbol('btcusd')
 *
 * @returns {string} Bitfinex notation
 */

const fromPlainSymbol = compose(concat('t'), toUpper)

/**
 * To standard symbol notation
 *
 * @param {string} symbol - Bitfinex notation
 *
 * @example
 *    // > 'btcusd'
 *    fromPlainSymbol('tBTCUSD')
 *
 * @returns {string} Standard notation
 */

const toPlainSymbol = compose(drop(1), toLower)

/**
 * Convert standard order notation to Bitfinex specific
 *
 * @param {Object} data
 *
 * @returns {Object}
 */

function convert (data) {
  const cid = data.id

  const symbol = fromPlainSymbol(data.symbol)

  const price = data.price

  const amount = data.side === 'sell'
    ? data.quantity
    : data.quantity * -1

  const type = 'EXCHANGE MARKET'

  return {
    cid,
    symbol,
    amount,
    type,
    price
  }
}

/**
 * Recover to standard order notation
 *
 * @param {Object} data
 *
 * @returns {Object}
 */

function recover (order) {
  const id = order.cid
  const remoteId = order.id
  const time = order.mtsUpdate

  const price = order.price

  const symbol = toPlainSymbol(order.symbol)

  const status = order.status

  const side = order.amountOrig >= 0
    ? 'sell'
    : 'buy'

  const quantity = Math.abs(order.amountOrig)

  const type = 'market'

  const broker = 'bitfinex'

  return {
    id,
    remoteId,
    symbol,
    quantity,
    price,
    side,
    broker,
    status
  }
}


module.exports = {
  toPlainSymbol,
  fromPlainSymbol,
  convert,
  recover
}
