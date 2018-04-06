const {
  sum,
  map,
  path,
  sortBy,
  head,
  last,
  compose,
  curry,
  pathSatisfies,
  gte,
  lte,
  takeWhile
} = require('ramda')

/**
 * Remotely executed order
 *
 * @typedef {Object} Order
 *
 * @property {string} id - Order id
 * @property {string} ts - Timestamp
 * @property {string} symbol - all lowercase symbol, like `ethusd`
 * @property {number} amount - quantity to buy or sell
 * @property {number} price - result price for filled orders
 * @property {string} side - BUY or SELL
 * @property {string} type - LIMIT or MARKET
 * @property {string} market - Exchange market
 */

/**
 * Open position
 *
 * @typedef {Object} Slot
 *
 * @property {string} id
 * @property {number} amount
 * @property {Order} orderOpen - Ref to open order
 */

/**
 * @param {Slot} slot
 *
 * @return {number}
 */

const priceGetter = path(['orderOpen', 'price'])

const sortedByPrice = sortBy(priceGetter)


const lowest = compose(
  head,
  sortedByPrice
)

const highest = compose(
  last,
  sortedByPrice
)

const untilMark = curry(
  function (x, slots) {
    const pred = gte(x)
    const isOk = pathSatisfies(pred, ['orderOpen', 'price'])

    return takeWhile(isOk, sortedByPrice(slots))
  }
)

const totalAmount = compose(
  sum,
  map(priceGetter)
)

module.exports = {
  lowest,
  highest,
  untilMark,
  totalAmount
}
