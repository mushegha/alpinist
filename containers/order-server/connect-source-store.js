const debug = require('debug')('alpinist:orders')

const getenv = require('getenv')

const {
  tap
} = require('ramda')

const KafkaObserver = require('@alpinist/kafka-observer')

const OrderStore = require('./lib/order-store')

/**
 * Settings
 */

const ZOOKEEPER_SETTINGS = getenv.multi({
  host: ['ZOOKEEPER_HOST', 'localhost'],
  port: ['ZOOKEEPER_PORT', 2182, 'int']
})

const ZOOKEEPER_URL = `${ZOOKEEPER_SETTINGS.host}:${ZOOKEEPER_SETTINGS.port}`

/**
 * Init
 */

const store = new OrderStore()

const kafkaObserver = new KafkaObserver(ZOOKEEPER_URL)

const toPayload = message =>
  [{
    topic: 'alpinist_orders',
    messages: [ message ]
  }]


function debugReceived (order) {
  debug('Received a new order: %O', order)
}

/**
 * Run
 */

store
  .source()
  .map(tap(debugReceived))
  .map(JSON.stringify)
  .map(toPayload)
  .subscribe(kafkaObserver)
