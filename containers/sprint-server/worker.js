const debug = require('debug')('alpinist:worker')

const Ticker = require('./lib/observables/ticker')

const performBuy = require('./lib/strategies/buy')

const source$ = Ticker('tBTCUSD')

async function next (ticker) {
  console.log(ticker)

  await performBuy(ticker.ask)
    .then(console.log)
}

const sub = source$
  .do(_ => debug('Got tick from remote'))
  .subscribe({ next })
