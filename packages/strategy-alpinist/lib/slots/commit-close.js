const {
  filter,
  curryN,
  drop
} = require('ramda')

/**
 * @param {Object} opts
 * @param {number} opts.limit_close
 * @param {number} opts.limit_keep
 *
 * @param {Array}
 */

function commitClose (opts, level, slots = []) {
  const {
    limit_close,
    limit_keep
  } = opts

  const isUnder = slot => slot.level < level

  const { length } = filter(isUnder, slots)

  if (length <= limit_close + limit_keep) {
    return slots
  }

  return drop(limit_close, slots)
}

module.exports = curryN(3, commitClose)
