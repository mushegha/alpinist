const {
  compose,
  split,
  splitAt,
  join,
  toLower,
  toUpper
} = require('ramda')

/**
 * To CEX.io symbol notation
 *
 * @param {string} symbol - Standard notation
 *
 * @example
 *    // > 'BTC:USD'
 *    fromPlainSymbol('btcusd')
 *
 * @returns {string} CEX.io notation
 */

const fromPlainSymbol = compose(
  join(':'),
  splitAt(-3),
  toUpper
)

/**
 * To standard symbol notation
 *
 * @param {string} symbol - CEX.io notation
 *
 * @example
 *    // > 'btcusd'
 *    toPlainSymbol('BTC:USD')
 *
 * @returns {string} Standard notation
 */

const toPlainSymbol = compose(
  join(''),
  split(':'),
  toLower
)

/**
 * Recover to standard ticker notation
 *
 * @param {Object} data
 *
 * @returns {Object}
 */

function recover (data) {
  const broker = 'cexio'
  const symbol = toPlainSymbol(data.pair)

  const bid_price = data.bid

  const ask_price = data.ask
  const ask_quantity = data.volume

  const timestamp = Number(data.timestamp)

  return {
    broker,
    symbol,
    bid_price,
    ask_price,
    ask_quantity,
    timestamp
  }
}


module.exports = {
  toPlainSymbol,
  fromPlainSymbol,
  recover
}
