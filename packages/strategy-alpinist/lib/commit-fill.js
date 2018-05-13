const {
  isEmpty,
  curryN
} = require('ramda')

const Z = require('./helpers')

/**
 * Append new slot on given `price` if available
 *
 * @param {Object} opts
 * @param {number} opts.level_threshold
 * @param {number} opts.weight_initial -
 * @param {number} opts.weight_up_b - Addition
 * @param {number} opts.weight_up_k - Multiplication
 * @param {number} opts.weight_down_b
 * @param {number} opts.weight_down_k
 * @param {number} price
 * @param {Array}  slots
 *
 * @returm {Maybe} - Next quantity
 */

function commit (opts, price, slots = []) {
  const {
    level_threshold,
    weight_initial,
    weight_up_b,
    weight_up_k,
    weight_down_b,
    weight_down_k
  } = opts

  const weightOf = ({ price, quantity }) => price * quantity

  const fromWeight = weight => ({
    price,
    quantity: weight / price
  })

  const push = weight => Z.add(fromWeight(weight), slots)


  const header = Z.maxByPrice(slots)
  const footer = Z.minByPrice(slots)

  // on first run
  if (isEmpty(slots)) {
    return push(weight_initial)
  }

  // when goes up
  if (price >= header.price + level_threshold) {
    const weight = weightOf(header) * weight_up_k + weight_up_b
    return push(weight)
  }

  // when goes down
  if (price <= footer.price - level_threshold) {
    const weight = weightOf(footer) * weight_down_k + weight_down_b
    return push(weight)
  }

  // no action
  return slots
}

module.exports = curryN(3, commit)
