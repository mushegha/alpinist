const debug = require('debug')('alpinist:worker')

const Ticker = require('./lib/observables/ticker')

const performBuy = require('./lib/strategies/buy')
const performSell = require('./lib/strategies/sell')

async function next (ticker) {
  const options = {
    treshold: 1,
    investment: 100,
    limitSell: 3,
    limitKeep: 1
  }

  await performBuy(options, ticker.ask)
  await performSell(options, ticker.bid)
}

const source$ = Ticker('tBTCUSD')

const sub = source$.subscribe({ next })
