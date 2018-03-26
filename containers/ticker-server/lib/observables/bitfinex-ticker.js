const debug = require('debug')('alpinist:ticker:observable')

const { Observable } = require('rxjs')

const createClient = require('../clients/bitfinex')

const manyFrom = require('../getters/bitfinex-many')

/**
 * Settings
 */

const SLEEP = 6e3


const fetcherOf = symbols => {
  const client = createClient()

  return () => manyFrom(client, symbols)
}


function create (symbols = []) {
  const fetchAll = fetcherOf(symbols)

  const emitter = observer => {
    const emit = ticker =>
      observer.next(ticker)

    const emitEach = tickers =>
      tickers.forEach(emit)

    const perform = () =>
      fetchAll()
        .then(ts => ts.forEach(emit))

    // TODO: handle 'rate limit' errors
    const interval = setInterval(perform, SLEEP)

    // unsubscribe
    return () => clearInterval(interval)
  }

  return Observable.create(emitter)
}


module.exports = create
