const Store = require('@alpinist/order-store')

const {
  Producer,
  Client
} = require('kafka-node')

const store = new Store()

const client = new Client('127.0.0.1:2181')

const producer = new Producer(client)

producer.on('ready', _ => {
  const send = payloads =>
    producer.send(payloads, (err, data) => {})

  const topic = 'alpinist_orders'

  store
    .source()
    .map(JSON.stringify)
    .map(messages => [{ topic, messages }])
    .subscribe(send)
})


