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

  const price = data.price

  const amount = data.side === 'sell'
    ? data.quantity * -1
    : data.quantity

  const type = 'EXCHANGE MARKET'

  return {
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
  const orderId = order.id
  const orderTime = order.mtsUpdate

  const price = order.price

  const symbol = toPlainSymbol(order.symbol)

  const quantity = Math.abs(order.amount)

  const side = order.amountOrig >= 0
    ? 'buy'
    : 'sell'

  return {
    symbol,
    quantity,
    price,
    side
  }
}


module.exports = {
  toPlainSymbol,
  fromPlainSymbol,
  convert,
  recover
}
