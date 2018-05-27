const {
  Producer,
  Client
} = require('kafka-node')

const Source = require('./lib/source')

const Store = require('./lib/store')

const store = Store()

Source()
  .map(x => Object.assign(x, { time: Date.now() }))
  .subscribe(ticker => {
    const { broker, symbol } = ticker
    const id = `${broker}-${symbol}`

    store.upsert(id, _ => ticker)
  })


// const client = new Client('127.0.0.1:2181')
//
// const producer = new Producer(client)
//
// producer.on('ready', _ => {
//   const send = payloads =>
//     producer.send(payloads, (err, data) => {})
//
//   Source()
//     .subscribe(send)
// })
//
//
