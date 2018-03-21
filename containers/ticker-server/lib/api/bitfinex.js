const { rest } = require('../clients/bitfinex')

const {
  merge,
  compose,
  evolve,
  flip,
  fromPairs,
  map,
  pick,
  prop,
  reverse,
  toPairs
} = require('ramda')

/**
 * Helpers
 */

const lookup = flip(prop)

const flipped = compose(
  fromPairs,
  map(reverse),
  toPairs
)

/**
 * Constants
 */

const ORIGIN = 'bitfinex'

const SYMBOLS = {
  'btcusd': 'tBTCUSD',
  'neousd': 'tNEOUSD',
  'ethusd': 'tETHUSD'
}

/**
 * Callback for each request
 */

function callback (err, ticks) {
  const translate = compose(
    merge({
      origin: ORIGIN,
      moment: new Date()
    }),
    pick([
      'bid',
      'ask',
      'symbol'
    ]),
    evolve({
      symbol: lookup(flipped(SYMBOLS))
    })
  )

  return map(translate, ticks)
}


const fetchAll = symbols =>
  rest.tickers(symbols, callback)


module.exports.fetchAll = compose(
  fetchAll,
  map(lookup(SYMBOLS))
)
