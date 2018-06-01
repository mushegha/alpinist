const { Subject } = require('rxjs/Rx')

const {
  pick,
  assoc
} = require('ramda')

const Cexio = require('./cexio')
const Bitfinex = require('./bitfinex')

/**
 * Helpers
 */

const toRelevant = pick([
  'broker',
  'symbol',
  'bid_price',
  'ask_price'
])

const timestamped = x =>
  assoc('ts', Date.now(), x)

/**
 * Monitor
 */

function Monitor (opts = {}) {
  const ticker$ = new Subject()

  Cexio().subscribe(ticker$)
  Bitfinex().subscribe(ticker$)

  return ticker$
    .map(timestamped)
    .map(toRelevant)
}

module.exports = Monitor
