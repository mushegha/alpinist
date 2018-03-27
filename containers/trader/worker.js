const debug = require('debug')('alp:ticker:worker')

const getenv = require('getenv')

const observe = require('./lib/observables/redis-ticker')

/**
 * Constants
 */

const symbol = getenv('TRADER_SYMBOL')

const ticker$ = observe(symbol)

ticker$.subscribe(console.log)
