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
    limit_close,
    limit_keep
  } = opts

  const { length } = Z.rangeByPrice(-Infinity, price, slots)

  if (length <= limit_close + limit_keep) {
    return slots
  }

  return Z.range(limit_close, Infinity, slots)
}

module.exports = curryN(3, commitClose)
