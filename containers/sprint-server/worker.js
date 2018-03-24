const debug = require('debug')('alpinist:worker')

const Ticker = require('./lib/observables/ticker')

const performBuy = require('./lib/strategies/buy')
const performSell = require('./lib/strategies/sell')

const options = require('./options')

async function next (ticker) {
  debug('Evaluating buy strategy')
  await performBuy(options, ticker.ask)

  debug('Evaluating sell strategy')
  await performSell(options, ticker.bid)
}

const source$ = Ticker('tBTCUSD')

const sub = source$.subscribe({ next })
