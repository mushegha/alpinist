const debug = require('debug')('alp:trader:worker')

const getenv = require('getenv')

const observe = require('./lib/observables/redis-ticker')

const buyStrategy = require('./lib/strategies/buy')
const sellStrategy = require('./lib/strategies/sell')

/**
 * Constants
 */

const symbol = getenv('TRADER_SYMBOL')

const ticker$ = observe(symbol)

async function next ({ ask, bid }) {
  const options = {
    treshold: 3,
    investment: 12,
    upK: 1,
    upB: 3,
    downK: 1.25,
    downB: 0,
    limitSell: 3,
    limitKeep: 1
  }

  debug('Evaluating buy strategy')
  await buyStrategy(options, ask)

  debug('Evaluating sell strategy')
  await sellStrategy(options, bid)
}

ticker$.subscribe({ next })
