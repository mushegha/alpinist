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

function commitDrop (opts, buy_price, slots = []) {
  const {
    sellLimit,
    sellOffset
  } = opts

  const { length } = Z.rangeByPrice(-Infinity, buy_price, slots)

  if (length < sellLimit + sellOffset) {
    return slots
  }

  return Z.range(sellLimit, Infinity, slots)
}

module.exports = curryN(3, commitDrop)
