const { ConsumerGroup } = require('kafka-node')

const { Observable } = require('rxjs/Rx')

const { prop } = require('ramda')

function SourceKafka () {
  const options = {
    host: 'localhost:2181',
    groupId: 'ticker-source'
  }

  const consumer = new ConsumerGroup(options, 'alpinist_tickers')

  return Observable
    .fromEvent(consumer, 'message')
    .map(prop('value'))
    .map(JSON.parse)
}

module.exports = SourceKafka
