const debug = require('debug')('worker')

const { Observable } = require('rxjs')

const { connect } = require('./lib/clients/rethinkdb')

const { insert } = require('./lib/api/rethinkdb')

const { fetchAll } = require('./lib/api/bitfinex')

/**
 * Constants
 */

const SYMBOLS = [
  'btcusd',
  'ethusd',
  'neousd'
]

const DELAY = 60000 / 10 // limit of 10 per minute

/**
 * DB connection Promise
 */

const awaitConnection = connect()

/**
 * Actions
 */

const fromRemote = () =>
  fetchAll(SYMBOLS)

const intoDatabase = data =>
  awaitConnection.then(insert(data))

/**
 *
 */

Observable
  .timer(0, DELAY)
  .flatMap(fromRemote)
  .do(_ => debug('Data received from remote'))
  .subscribe(intoDatabase)
