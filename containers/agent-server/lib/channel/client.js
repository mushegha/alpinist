const debug = require('debug')('alpinist:mqtt')

const mqtt = require('mqtt')

const getenv = require('getenv')

/**
 * Settings
 */

const MQTT_URL = getenv('MQTT_URL', 'mqtt://localhost:1883')

/**
 * Mqtt
 */

function connect (url = MQTT_URL) {
  debug('Connecting to %s', url)

  const client = mqtt.connect(url)

  client.on('error', err => {
    debug('Error: %s', err.message)
  })

  client.on('connect', _ => {
    debug('Client connected')
  })

  client.on('close', _ => {
    debug('Client closed')
  })

  return client
}

/**
 * Expose
 */

module.exports = connect
