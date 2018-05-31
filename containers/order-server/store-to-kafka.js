const debug = require('debug')('alpinist:orders')

const {
  tap
} = require('ramda')

const KafkaObserver = require('@alpinist/kafka-observer')

const OrderStore = require('./lib/order-store')

const store = new OrderStore()

const kafkaObserver = new KafkaObserver('178.62.246.62:2181')

const toPayload = message =>
  [{
    topic: 'alpinist_orders',
    messages: [ message ]
  }]


function debugReceived (order) {
  debug('Received a new order: %O', order)
}

store
  .source()
  .map(tap(debugReceived))
  .map(JSON.stringify)
  .map(toPayload)
  .subscribe(kafkaObserver)
