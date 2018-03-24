const debug = require('debug')('alpinist:worker')

const Ticker = require('./lib/observables/ticker')

const source$ = Ticker('tBTCUSD')

function next (ticker) {
  console.log(ticker)
}

const sub = source$
  .do(_ => debug('Got tick from remote'))
  .subscribe({ next })
