const debug = require('debug')('alpinist:tickers:bitfinex')

const Axios = require('axios')

const {
  fromPlainSymbol,
  recover
} = require('./helpers')

const {
  always,
  applySpec,
  join,
  compose,
  prop,
  map
} = require('ramda')

/**
 * Settings
 */

const baseURL = 'https://api.bitfinex.com/v2/tickers'

/**
 * Setup
 */

const request = Axios.create({ baseURL })

/**
 * Helpers
 */

const report = err =>
  debug('Error %s', err.message)

const compileTarget = applySpec({
  url: always('/'),
  params: {
    symbols: compose(
      join(','),
      map(fromPlainSymbol)
    )
  }
})

const recoverAll = map(recover)

/**
 *
 */

function fetchAll (symbols) {
  const target = compileTarget(symbols)

  return request(target)
    .then(res => res.data)
    .then(map(recover))
    .catch(report)
}

/**
 *
 */

module.exports = {
  fetchAll
}
