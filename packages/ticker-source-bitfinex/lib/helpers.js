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
 * Recover to standard ticker notation
 *
 * @param {Object} data
 *
 * @returns {Object}
 */

function recover (data) {
  const broker = 'bitfinex'
  const symbol = toPlainSymbol(data.symbol)

  const bid_price = data.bid
  const bid_quantity = data.bidSize

  const ask_price = data.ask
  const ask_quantity = data.askSize

  const time = Date.now()

  return {
    broker,
    symbol,
    bid_price,
    bid_quantity,
    ask_price,
    ask_quantity,
    time
  }
}


module.exports = {
  toPlainSymbol,
  fromPlainSymbol,
  recover
}
