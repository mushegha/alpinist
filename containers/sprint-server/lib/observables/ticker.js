const debug = require('debug')('alpinist:ticker')

const { Observable } = require('rxjs')

const {
  flatMap,
  map
} = require('rxjs/operators')

const {
  assoc,
  compose,
  toLower
} = require('ramda')

const {
  monotonicFactory
} = require('ulid')

const {
  bitfinex,
  mongo
} = require('../clients')

/**
 * Debug
 */

const tapLog = ({ bid, ask }) =>
  debug('Ticker data received: bid=%d ask=%d', bid, ask)

/**
 * Helper operators
 */

const assignId = () => {
  const ulid = monotonicFactory()
  const gen = compose(toLower, ulid)

  const assign = x => assoc('id', gen(), x)

  return map(assign)
}

const assignDateCreated = () =>  {
  const gen = () => new Date()

  const assign = x => assoc('dateCreated', gen(), x)

  return map(assign)
}

const persistOnMongo = () => {
  const insert = x =>
    mongo
      .get('ticker')
      .insert(x)

  return flatMap(insert)
}

/**
 *
 */

function fromTicker (symbol) {
  const ws = bitfinex.ws(2)

  ws.on('open', () => {
    ws.subscribeTicker(symbol)
  })

  ws.open()

  return observer => {
    ws.onTicker({ symbol }, ticker => {
      const bid = ticker[0]
      const ask = ticker[2]

      observer.next({ bid, ask })
    })

    return () => ws.close()
  }
}

/**
 * Expose observable factory
 */

module.exports = symbol =>
  Observable
    .create(fromTicker(symbol))
    .do(tapLog)
    .pipe(
      assignId(),
      assignDateCreated(),
      persistOnMongo()
    )
