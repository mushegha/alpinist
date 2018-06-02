const {
  compose,
  replace,
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
  replace('-', ':'),
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
  replace(':', '-'),
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

  const bid_price = Number(data.bid)
  const ask_price = Number(data.ask)

  const x = {
    broker,
    symbol,
    bid_price,
    ask_price
  }

  return x
}


module.exports = {
  toPlainSymbol,
  fromPlainSymbol,
  recover
}
