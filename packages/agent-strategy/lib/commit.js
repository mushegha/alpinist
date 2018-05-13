const {
  compose,
  curryN,
  tap
} = require('ramda')

const commitFill = require('./commit-fill')
const commitDrop = require('./commit-drop')

function commit (options, ticker, slots) {
  const { bid_price, ask_price } = ticker

  const afterFill = commitFill(options, ask_price, slots)
  const afterDrop = commitDrop(options, bid_price, afterFill)

  return afterDrop
}

module.exports = curryN(3, commit)
