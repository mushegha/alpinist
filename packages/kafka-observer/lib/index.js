const {
  Client,
  Producer
} = require('kafka-node')

const {
  unless,
  isNil,
  compose
} = require('ramda')

const {
  ensureArray
} = require('ramda-adjunct')

/**
 *
 */

function KafkaObserver (uri) {
  const client = new Client(uri)
  const producer = new Producer(client)

  const report = unless(isNil, console.error)

  const send = payloads =>
    producer.send(payloads, report)

  const close = _ =>
    client.close()

  return {
    next: compose(send, ensureArray),
    error: report,
    complete: close
  }
}

module.exports = KafkaObserver
