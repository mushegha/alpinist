const { ConsumerGroup } = require('kafka-node')

const { Observable } = require('rxjs/Rx')

const {
  prop,
  merge,
  tap
} = require('ramda')

const DEFAULT_OPTIONS = {
  host: 'localhost:2181',
  groupId: 'node-ticker-source',
  sessionTimeout: 15000
}

function SourceKafka (opts = {}) {
  console.log('init kafka ticker source')

  const options = merge(DEFAULT_OPTIONS, opts)

  const consumer = new ConsumerGroup(options, 'alpinist_tickers')

  return Observable
    .fromEvent(consumer, 'message')
    .map(prop('value'))
    .map(JSON.parse)
}

module.exports = SourceKafka
