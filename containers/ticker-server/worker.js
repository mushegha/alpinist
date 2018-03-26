const debug = require('debug')('alpinist:ticker:worker')

//
// const { connect } = require('./lib/clients/rethinkdb')
//
// const { insert } = require('./lib/api/rethinkdb')

const createTicker = require('./lib/observables/bitfinex-ticker')

createTicker()
  .subscribe(console.log)

//
//
/**
 * Constants
 */
//
// const SYMBOLS = [
//   'btcusd',
//   'ethusd',
//   'neousd'
// ]
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
