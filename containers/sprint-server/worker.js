const debug = require('debug')('alpinist:worker')

const Ticker = require('./lib/observables/ticker')

const performBuy = require('./lib/strategies/buy')
const performSell = require('./lib/strategies/sell')

const source$ = Ticker('tBTCUSD')

async function next (ticker) {
  console.log(ticker)

  await performBuy(ticker.ask)
    .then(console.log)

  await performSell(ticker.bid)
}

const sub = source$
  .do(_ => debug('Got tick from remote'))
  .subscribe({ next })
