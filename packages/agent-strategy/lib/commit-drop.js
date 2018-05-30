const {
  filter,
  curryN,
  drop
} = require('ramda')

const Z = require('./helpers')

/**
 * @param {Object} opts
 * @param {number} opts.limit_close
 * @param {number} opts.limit_keep
 *
 * @param {Array}
 */

function commitClose (opts, price, slots = []) {
  const {
    sellLimit,
    sellOffset
  } = opts

  const { length } = Z.rangeByPrice(-Infinity, price, slots)

  if (length < sellLimit + sellOffset) {
    return slots
  }

  return Z.range(sellLimit, Infinity, slots)
}

module.exports = curryN(3, commitClose)
