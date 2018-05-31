const debug = require('debug')('alpinist:agents')

const mqtt = require('mqtt')

const { Observable } = require('rxjs/Rx')

function source () {
  const client = mqtt.connect('mqtt://178.62.246.62:1883')

  client.on('connect', function () {
    debug('Connected to mqtt')
    client.subscribe('tickers')
  })

  const selector = (_, buf) =>
    buf.toString()

  return Observable
    .fromEvent(client, 'message', selector)
    .map(JSON.parse)
}

module.exports = {
  source
}
