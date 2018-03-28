const debug = require('debug')('alp:trader:worker')

const Bull = require('./lib/clients/bull')

const observe = require('./lib/observables/redis-ticker')

/**
 *
 */

const bull = new Bull('traders')

bull.process(__dirname + '/lib/workers/ladder/index.js')

/**
 *
 */

const tickers$ = observe()

async function next (ticker) {
  bull.add(ticker)
}

tickers$.subscribe({ next })
