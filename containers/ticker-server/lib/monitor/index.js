const { Subject } = require('rxjs/Rx')

const Cexio = require('./cexio')
const Bitfinex = require('./bitfinex')

function Monitor (opts = {}) {
  const ticker$ = new Subject()

  Cexio().subscribe(ticker$)
  Bitfinex().subscribe(ticker$)

  return ticker$
}

module.exports = Monitor
