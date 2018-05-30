const KafkaObserver = require('@alpinist/kafka-observer')

const OrderStore = require('./lib/order-store')

const store = new OrderStore()

const kafkaObserver = new KafkaObserver('178.62.246.62:2181')

const toPayload = message =>
  [{
    topic: 'alpinist_orders',
    messages: [ message ]
  }]

store
  .source()
  .map(JSON.stringify)
  .map(toPayload)
  .subscribe(kafkaObserver)
