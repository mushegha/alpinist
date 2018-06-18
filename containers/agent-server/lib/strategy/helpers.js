const {
  reduce,
  minBy,
  maxBy,
  slice,
  filter,
  whereEq,
  reject,
  append,
  applySpec,
  curryN,
  sortBy,
  prop,
  flip,
  compose,
  propSatisfies,
  eqProps,
  differenceWith
} = require('ramda')

const { inRange } = require('ramda-adjunct')

/**
 * Helpers
 */

const appendTo = flip(append)

const propPrice = prop('buy_price')

const sortByPrice = sortBy(propPrice)

const hasPriceInRange = curryN(3,
  (min, max, { buy_price }) => inRange(min, max, buy_price)
)

const diff = differenceWith(eqProps('id'))

/**
 * Add a slot to list
 *
 * @param {Object} slot
 * @param {number} slot.buy_price - Price mark
 * @param {number} slot.quantity - Quantity
 * @param {Array}  slots
 *
 * @returns {Array} - Slots
 */

function add ({ buy_price, quantity }, slots) {
  const add = compose(
    sortByPrice,
    appendTo(slots)
  )

  const slot = {
    buy_price,
    quantity
  }

  return add(slot)
}

/**
 *
 */

function remove ({ id }, slots) {
  const isMatch = whereEq({ id })

  const remove = compose(
    sortByPrice,
    reject(whereEq({ id }))
  )

  return remove(slots)
}

/**
 *
 */

function range (from, to, slots) {
  const rangeOf = compose(
    slice(from, to),
    sortByPrice
  )

  return rangeOf(slots)
}

/**
 *
 */

function rangeByPrice (min, max, slots) {
  const pred = hasPriceInRange(min, max)

  const rangeOf = compose(
    filter(pred),
    sortByPrice
  )

  return rangeOf(slots)
}

/**
 *
 */

function minByPrice (slots) {
  return reduce(minBy(propPrice), { buy_price: Infinity }, slots)
}

/**
 *
 */

function maxByPrice (slots) {
  return reduce(maxBy(propPrice), { buy_price: 0 }, slots)
}

/**
 * Expose curried
 */

module.exports.add = curryN(2, add)

module.exports.remove = curryN(2, remove)

module.exports.range = curryN(3, range)

module.exports.rangeByPrice = curryN(3, rangeByPrice)

module.exports.diff = diff

module.exports.sortByPrice = sortByPrice

module.exports.minByPrice = minByPrice

module.exports.maxByPrice = maxByPrice
