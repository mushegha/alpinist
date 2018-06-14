const {
  compose,
  concat,
  drop,
  replace,
  splitAt,
  join,
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
 *    fromPlainSymbol('btc-usd')
 *
 * @returns {string} Bitfinex notation
 */

const fromPlainSymbol = compose(
  concat('t'),
  replace('-', ''),
  toUpper
)

/**
 * To standard symbol notation
 *
 * @param {string} symbol - Bitfinex notation
 *
 * @example
 *    // > 'btc-usd'
 *    fromPlainSymbol('tBTCUSD')
 *
 * @returns {string} Standard notation
 */

const toPlainSymbol = compose(
  drop(1),
  join('-'),
  splitAt(-3),
  toLower)

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
 * @param {Object} raw
 *
 * @returns {Object}
 */

function recover (raw) {
  const ts = raw.mtsUpdate || Date.now()

  const price = raw.price

  const symbol = toPlainSymbol(raw.symbol)

  const status = raw.status

  const side = raw.amountOrig < 0
    ? 'sell'
    : 'buy'

  const quantity = Math.abs(raw.amountOrig)

  return {
    ts,
    symbol,
    quantity,
    price,
    side,
    status
  }
}


module.exports = {
  toPlainSymbol,
  fromPlainSymbol,
  convert,
  recover
}
