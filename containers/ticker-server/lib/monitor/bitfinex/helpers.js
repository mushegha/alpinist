const {
  replace,
  splitAt,
  join,
  evolve,
  assoc,
  zipObj,
  compose,
  concat,
  drop,
  toLower,
  toUpper
} = require('ramda')

/**
 * Settings
 */

const FIELDS = [
  'symbol',
  'bid_price',
  'bid_quantity',
  'ask_price',
  'ask_quantity'
]


/**
 * Set `ts` field to current epoch time
 */

const timestamp = obj =>
  assoc('ts', Date.now(), obj)

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
  toUpper,
  replace('-', '')
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
  join('-'),
  splitAt(-3),
  drop(1),
  toLower
)

/**
 * Recover to standard ticker notation
 *
 * @param {Object} data
 *
 * @returns {Object}
 */

const recover = compose(
  timestamp,
  evolve({ symbol: toPlainSymbol }),
  zipObj(FIELDS)
)

/**
 * Expose
 */

module.exports = {
  toPlainSymbol,
  fromPlainSymbol,
  recover
}
