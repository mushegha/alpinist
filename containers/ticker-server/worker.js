const debug = require('debug')('alpinist:ticker:worker')

const getenv = require('getenv')

const observe = require('./lib/observables/bitfinex-ticker')

const update = require('./lib/setters/redis-one')

const getRedis = require('./lib/clients/redis')

/**
 * Constants
 */

const symbols = getenv.array('TICKER_SYMBOLS', 'string', [])
const sleep = getenv.int('TICKER_SLEEP', 5e3)

const ticker$ = observe({ sleep }, symbols)

ticker$.subscribe(update(getRedis()))
