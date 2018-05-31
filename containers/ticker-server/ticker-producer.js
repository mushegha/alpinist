const { Subject } = require('rxjs/Rx')

const {
  Producer,
  Client,
  KeyedMessage
} = require('kafka-node')

const SourceBitfinex = require('@alpinist/ticker-source-bitfinex')
const SourceCexio = require('@alpinist/ticker-source-cexio')
const SourceYobit = require('@alpinist/ticker-source-yobit')

function Source () {
  const ticker$ = new Subject()

  SourceCexio().subscribe(ticker$)
  SourceBitfinex().subscribe(ticker$)
  SourceYobit().subscribe(ticker$)

  const topic = 'alpinist_tickers'

  // const asKeyedMessage = ticker => {
  //   const { broker, symbol } = ticker
  //
  //   const key = `${broker}-${symbol}`
  //   const val = JSON.stringify(ticker)
  //
  //   return new KeyedMessage(key, val)
  // }

  return ticker$
    .map(JSON.stringify)
    .bufferTime(5)
    .filter(arr => arr.length)
    .map(messages => [{ topic, messages }])
}

const client = new Client('178.62.246.62:2181')

const producer = new Producer(client)

producer.on('ready', _ => {
  console.log('ready')

  const report = err => {
    if (err) console.error(err)
  }

  const send = payloads => {
    producer.send(payloads, report)
  }

  Source()
    .subscribe(send)
})
