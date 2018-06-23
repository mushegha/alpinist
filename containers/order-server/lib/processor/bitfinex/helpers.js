const {
  compose,
  concat,
  drop,
  replace,
  splitAt,
  join,
  toLower,
  toUpper,
  zipObj
} = require('ramda')

/**
 *
 */

let incr = Date.now() * 1000

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
  toLower
)

/**
 * Convert standard order notation to Bitfinex specific
 *
 * @param {Object} data
 *
 * @returns {Object}
 */

function convert (data) {
  const cid = ++incr

  const symbol = fromPlainSymbol(data.symbol)

  const price = String(data.price)

  const amount = data.side === 'sell'
    ? data.quantity * -1
    : data.quantity

  const type = 'EXCHANGE MARKET'

  return {
    cid,
    symbol,
    amount: String(amount),
    type,
    price
  }
}

/**
 * Recover to standard order notation
 *
 * @param {Array} raw
 *
 * @returns {Object}
 */

function recover (raw) {
  const FIELDS = [
    'id',
    'gid',
    'cid',
    'symbol',
    'tsX',
    'ts',
    'quantityX',
    'quantity',
    'type',
    'typePrev',
    '_1',
    '_2',
    'flags',
    'info',
    '_3',
    '_4',
    'price',
    'priceAvg'
  ]

  const rawObj = zipObj(FIELDS, raw)

  const symbol = toPlainSymbol(rawObj.symbol)

  const status = 'closed'

  const side = rawObj.quantity < 0
    ? 'sell'
    : 'buy'

  const quantity = Math.abs(rawObj.quantity)

  const price = rawObj.priceAvg

  const { cid, ts, info } = rawObj

  //

  return {
    cid,
    symbol,
    status,
    side,
    price,
    quantity,
    ts,
    info
  }
}


module.exports = {
  toPlainSymbol,
  fromPlainSymbol,
  convert,
  recover
}

