const {
  map,
  pick,
  assoc,
  compose,
  merge
} = require('ramda')

const commit = require('./commit')

const H = require('./helpers')

function compile (opts, ticker, slots) {
  const data = pick(['agent', 'broker', 'symbol'], opts)

  const updated = commit(opts, ticker, slots)

  const sell = H.diff(slots, updated)
  const buy = H.diff(updated, slots)

  const sellX = sell.map(assoc('side', 'sell'))
  const buyX = buy.map(assoc('side', 'buy'))

  return map(merge(data), [ ...buyX, ...sellX ])
}

module.exports = compile
