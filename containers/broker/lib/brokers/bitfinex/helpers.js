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
  const symbol = fromPlainSymbol(data.symbol)

  const amount = data.side === 'SELL'
    ? data.amount * -1
    : data.amount

  const type = 'EXCHANGE MARKET'

  return {
    symbol,
    amount,
    type
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
  const id = order.id
  const ts = order.mtsUpdate

  const price = order.price
  const value = order.getNotionalValue()

  const symbol = toPlainSymbol(order.symbol)

  const amount = Math.abs(order.getLastFillAmount())

  const side = order.amountOrig >= 0
    ? 'BUY'
    : 'SELL'

  return {
    id,
    ts,
    symbol,
    amount,
    price,
    value,
    side
  }
}


module.exports = {
  toPlainSymbol,
  fromPlainSymbol,
  convert,
  recover
}
