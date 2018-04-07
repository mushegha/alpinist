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

}

/**
 * Recover to standard order notation
 *
 * @param {Object} data
 *
 * @returns {Object}
 */

function recover (data) {

}


module.exports = {
  toPlainSymbol,
  fromPlainSymbol
}
