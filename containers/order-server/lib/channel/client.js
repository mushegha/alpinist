const debug = require('debug')('alpinist:orders')

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
  debug('Connecting to MQTT server at %s', url)

  const client = mqtt.connect(url)

  client.on('error', err => {
    debug('MQTT error: %s', err.message)
  })

  client.on('connect', _ => {
    debug('MQTT client connected')
  })

  client.on('close', _ => {
    debug('MQTT client closed')
  })

  return client
}

/**
 * Expose
 */

module.exports = connect
