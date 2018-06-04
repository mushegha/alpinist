const debug = require('debug')('alpinist:agents')

const mqtt = require('mqtt')

const { Observable } = require('rxjs/Rx')

const getenv = require('getenv')

/**
 * Settings
 */

const MQTT_URL = getenv('MQTT_URL', 'mqtt://localhost:1883')

function source () {
  const client = mqtt.connect(MQTT_URL)

  debug('Connecting to MQTT server at %s', MQTT_URL)

  client.on('connect', function () {
    debug('Connected to MQTT')
    client.subscribe('tickers/+')
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
