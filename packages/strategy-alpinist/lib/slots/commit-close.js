const {
  filter,
  curryN,
  drop
} = require('ramda')

const range = require('./range')
const rangeByPrice = require('./range-by-price')

/**
 * @param {Object} opts
 * @param {number} opts.limit_close
 * @param {number} opts.limit_keep
 *
 * @param {Array}
 */

function commitClose (opts, price, slots = []) {
  const {
    limit_close,
    limit_keep
  } = opts

  const { length } = rangeByPrice(-Infinity, price, slots)

  if (length <= limit_close + limit_keep) {
    return slots
  }

  return range(limit_close, Infinity, slots)
}

module.exports = curryN(3, commitClose)
