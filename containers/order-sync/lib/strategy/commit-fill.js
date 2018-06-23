const {
  isEmpty,
  curryN
} = require('ramda')

const Z = require('./helpers')

/**
 * Append new slot on given `price` if available
 *
 * @param {Object} opts
 * @param {number} opts.priceThreshold
 * @param {number} opts.buyIn - Initial investment
 * @param {Object} opts.buyInNextUp
 * @param {number} opts.buyInNextUp.k - Addition
 * @param {number} opts.buyInNextUp.b - Multiplication
 * @param {Object} opts.buyInNextDown
 * @param {number} opts.buyInNextDown.k
 * @param {number} opts.buyInNextDown.b
 * @param {number} price
 * @param {Array}  slots
 *
 * @returm {Maybe} - Next quantity
 */

function commit (opts, buy_price, slots = []) {
  const {
    priceThreshold,
    buyIn,
    buyInNextUp: { k: upK, b: upB },
    buyInNextDown: { k: downK, b: downB }
  } = opts

  const worthOf = ({ buy_price, quantity }) => buy_price * quantity

  const fromWorth = worth => ({
    buy_price,
    quantity: worth / buy_price
  })

  const push = worth => Z.add(fromWorth(worth), slots)

  const header = Z.maxByPrice(slots)
  const footer = Z.minByPrice(slots)

  // on first run
  if (isEmpty(slots)) {
    return push(buyIn)
  }

  // when goes up
  if (buy_price >= header.buy_price + priceThreshold) {
    const worth = worthOf(header) * upK + upB
    return push(worth)
  }

  // when goes down
  if (buy_price <= footer.buy_price - priceThreshold) {
    const worth = worthOf(footer) * downK + downB
    return push(worth)
  }

  // no action
  return slots
}

module.exports = curryN(3, commit)
