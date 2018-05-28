const {
  Subject,
  Observable
} = require('rxjs/Rx')

const {
  Consumer,
  Client
} = require('kafka-node')

const client = new Client('178.62.246.62:2181')

const consumer = new Consumer(client, [
  {
    topic: 'alpinist_tickers',
    offset: 0, //default 0
    partition: 0 // default 0
  }
])

Observable
  .fromEvent(consumer, 'message', x => x)
  .map(x => x.value)
  .map(JSON.parse)
  .subscribe(console.log)
