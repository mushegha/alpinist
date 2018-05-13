const { Subject } = require('rxjs/Rx')

const SourceBitfinex = require('@alpinist/ticker-source-bitfinex')
const SourceCexio = require('@alpinist/ticker-source-cexio')

function Source () {
  const ticker$ = new Subject()

  SourceCexio().subscribe(ticker$)
  SourceBitfinex().subscribe(ticker$)

  const topic = 'alpinist_tickers'

  return ticker$
    .map(JSON.stringify)
    .bufferTime(5)
    .filter(arr => arr.length)
    .map(messages => [{ topic, messages }])
}

module.exports = Source
