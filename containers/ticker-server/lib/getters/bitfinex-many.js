const debug = require('debug')('alpinist:ticker:getters')

const {
  curryN,
  compose,
  toLower,
  toUpper,
  tail,
  concat,
  pick,
  evolve,
  map
} = require('ramda')

/**
 * Helpers
 */

const toPlainSymbol = compose(toLower, tail)

const fromPlainSymbol = compose(concat('t'), toUpper)

const parse = compose(
  evolve({ symbol: toPlainSymbol }),
  pick([ 'symbol', 'bid', 'ask' ])
)

const callback = (err, res) => {
  return err
    ? Promise.reject(err)
    : Promise.resolve(res)
}

/**
 * Getters
 */

function fetchMany (client, symbols) {
  const xSymbols = map(fromPlainSymbol, symbols)

  debug('Fetching from remote: %O', symbols)

  return client
    .rest(2, { transform: true })
    .tickers(xSymbols, callback)
    .then(map(parse))
}

/**
 * Expose curried
 */

module.exports = curryN(2, fetchMany)
