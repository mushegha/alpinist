const { ulid } = require('ulid')

const {
  append,
  applySpec,
  curryN,
  prop,
  propOr,
  T
} = require('ramda')

/**
 * Create a slot with given params
 *
 * @param {number} price - Price mark
 * @param {number} volume - Quantity
 *
 * @returns {Slot}
 */

function from  (params) {
  const create = applySpec({
    // generate `_id` if not provided
    _id    : ulid,
    isOpen : T,
    price  : prop('price'),
    volume : prop('volume')
  })

  return create(params)
}

function add (params, slots) {
  const slot = from(params)

  return append(slot, slots)
}

module.exports = curryN(2, add)
