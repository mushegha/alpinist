const debug = require('debug')('alpinist:ticker:worker')

const observe = require('./lib/observables/bitfinex-ticker')

/**
 * Constants
 */

const SYMBOLS = [
  'btcusd',
  'ethusd',
  'neousd'
]

const ticker$ = observe(SYMBOLS)

ticker$.subscribe(console.log)

//
//
//
// const DELAY = 60000 / 10 // limit of 10 per minute
//
/**
 * DB connection Promise
 */
//
// const awaitConnection = connect()
//
/**
 * Actions
 */
//
// const fromRemote = () =>
//   fetchAll(SYMBOLS)
//
// const intoDatabase = data =>
//   awaitConnection
//     .then(insert(data))
//     .catch(err => debug('Write failed with error: %O', err))
//
/**
 *
 */
//
// Observable
//   .timer(0, DELAY)
//   .flatMap(fromRemote)
//   .do(_ => debug('Data received from remote'))
//   .subscribe(intoDatabase)
