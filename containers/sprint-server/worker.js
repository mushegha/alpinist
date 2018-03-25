const debug = require('debug')('alpinist:worker')

const Ticker = require('./lib/observables/ticker')

const performBuy = require('./lib/strategies/buy')
const performSell = require('./lib/strategies/sell')

const config = require('./config')

async function next (ticker) {
  debug('Evaluating buy strategy')
  await performBuy(config, ticker.ask)

  debug('Evaluating sell strategy')
  await performSell(config, ticker.bid)
}

const source$ = Ticker('tBTCUSD')

const sub = source$.subscribe({ next })
