const { Observable } = require('rxjs')

const Axios = require('axios')

const { map, prop, flip, compose, join } = require('ramda')

/**
 * Constants
 */

const baseURL = 'https://api.bitfinex.com/v2/'

const symbolsDict = {
  'btcusd': 'tBTCUSD',
  'neousd': 'tNEOUSD'
}

const pairsDict = {
  'tBTCUSD': 'btcusd',
  'tNEOUSD': 'neousd'
}

/**
 * Helpers
 */

const lookup = flip(prop)

const toSymbol = lookup(symbolsDict)

const toSymbols = compose(join(','), map(toSymbol))

const toPair = lookup(pairsDict)

const toTicker = args => {
  const bid = args[1]
  const ask = args[3]

  const pair = toPair(args[0])
  const provider = 'bitfinex'

  return { bid, ask, pair, provider }
}

/**
 * Remote API
 */

const { get } = Axios.create({ baseURL })

const fetch = pairs => {
  const params = { symbols: toSymbols(pairs) }

  return get('/tickers', { params })
    .then(prop('data'))
    .then(map(toTicker))
}

/**
 * Expose
 */

module.exports = pairs =>
  Observable
    .interval(60000 / 10) // Bitfinex limit
    .flatMap(_ => fetch(pairs))
