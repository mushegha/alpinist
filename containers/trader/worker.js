const debug = require('debug')('alp:trader:worker')

const Bull = require('./lib/clients/bull')

const Tickers = require('./lib/observables/redis-ticker')
const WithTraders = require('./lib/observables/mongodb-traders')

/**
 *
 */

const bull = new Bull('traders')

bull.process(__dirname + '/lib/workers/ladder/index.js')

/**
 *
 */

const tickers$ = Tickers()

async function next (ticker) {
  bull.add(ticker)
}

tickers$
  .flatMap(WithTraders)
  .subscribe({ next })
