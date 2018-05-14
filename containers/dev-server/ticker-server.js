const {
  Producer,
  Client
} = require('kafka-node')

const Source = require('./lib/source')

const client = new Client('127.0.0.1:2181')

const producer = new Producer(client)

producer.on('ready', _ => {
  const send = payloads =>
    producer.send(payloads, (err, data) => {})

  Source()
    .subscribe(send)
})


