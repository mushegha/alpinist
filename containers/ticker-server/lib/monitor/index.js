const {
  Subject,
  Observable
} = require('rxjs/Rx')

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

const dupBitfinex = x => {
  if (x.broker !== 'bitfinex') {
    return Observable.of(x)
  }

  const dup = assoc('broker', 'bitfinex2', x)
  return Observable.from([x, dup])
}

/**
 * Monitor
 */

function Monitor (opts = {}) {
  const ticker$ = new Subject()

  Cexio().subscribe(ticker$)
  Bitfinex().subscribe(ticker$)

  return ticker$
    .map(toRelevant)
    .flatMap(dupBitfinex)
    .map(timestamped)
}

module.exports = Monitor
