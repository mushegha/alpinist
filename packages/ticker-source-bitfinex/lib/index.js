const BFX = require('bitfinex-api-node')

const { Observable } = require('rxjs/Rx')

const {
  map,
  filter,
  endsWith
} = require('ramda')

const {
  fromPlainSymbol,
  toPlainSymbol,
  recover
} = require('./helpers')

const bfx = new BFX()

const rest = bfx.rest(2, { transform: true })

function SourceBitfinex () {
  const pSymbols = rest
    .symbols()
    .then(filter(endsWith('usd')))
    .then(map(fromPlainSymbol))

  const poll = symbols => {
    const promise = rest
      .tickers(symbols)

    return Observable
      .fromPromise(promise)
      .flatMap(Observable.from)
      .map(recover)
  }

  const init = symbols => {
    return Observable
      .interval(10000)
      .flatMap(_ => poll(symbols))
  }

  return Observable
    .fromPromise(pSymbols)
    .flatMap(init)
}

module.exports = SourceBitfinex
