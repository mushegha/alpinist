const {
  sortBy,
  prop,
  isEmpty,
  compose,
  last,
  head
} = require('ramda')

const { Maybe } = require('monet')

const maxLevel = compose(prop('level'), last)
const maxWeight = compose(prop('weight'), last)

const minLevel = compose(prop('level'), head)
const minWeight = compose(prop('weight'), head)

function renderWeight (opts, level, slots = []) {
  const {
    level_threshold,
    weight_initial,
    weight_up_b,
    weight_up_k,
    weight_down_b,
    weight_down_k
  } = opts

  if (isEmpty(slots)) {
    return Maybe.some(weight_initial)
  }

  if (level <= minLevel(slots) - level_threshold) {
    const weight =
    return Maybe.some
  }
}

/**
 * Append new slot on given `level` if available
 *
 * @param {Object} opts
 * @param {number} opts.level_threshold
 * @param {number} opts.weight_initial -
 * @param {number} opts.weight_up_b - Addition
 * @param {number} opts.weight_up_k - Multiplication
 * @param {number} opts.weight_down_b
 * @param {number} opts.weight_down_k
 * @param {number} level
 * @param {Array}  slots
 *
 * @returm {Array} - With new slots appended
 */

function commitOpen (opts, level, slots = []) {
  const sortedSlots = sortBy(prop('level'), slots)

  if (isEmpty(slots)) {
    return {

    }
  }

}

module.exports = commitOpen
