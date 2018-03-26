const debug = require('debug')('alpinist:ticker:observable')

const { Observable } = require('rxjs')

const {
  compose,
  toLower,
  toUpper,
  tail,
  concat,
  pick,
  evolve,
  map
} = require('ramda')

const Bitfinex = require('../clients/bitfinex')

/**
 * Helpers
 */

const toPlainSymbol = compose(toLower, tail)

const fromPlainSymbol = compose(concat('t'), toUpper)

const parse = compose(
  evolve({ symbol: toPlainSymbol }),
  pick([ 'symbol', 'bid', 'ask' ])
)

function fetchAll (client, symbols) {
  const callback = (err, res) => {
    return err
      ? Promise.reject(err)
      : Promise.resolve(res)
  }

  return client
    .tickers(symbols, callback)
    .then(map(parse))
}


function create (symbols = []) {
  const bfx = Bitfinex()

  const rest = bfx.rest(2, { transform: true })

  const fromRemote = () =>
    fetchAll(rest, map(fromPlainSymbol, symbols))

  // TODO: handle 'rate limit' errors
  return Observable
    .timer(0, 6000)
    .flatMap(_ => fromRemote())
    .flatMap(a => a)
}


module.exports = create
