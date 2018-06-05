const debug = require('debug')('alpinist:tickers')

const mqtt = require('mqtt')

const getenv = require('getenv')

const Monitor = require('./lib/monitor')

/**
 * Settings
 */

const MQTT_URL = getenv('MQTT_URL', 'mqtt://localhost:1883')

/**
 * Connect
 */

const ticker$ = Monitor()

/**
 * Debug
 */

ticker$
  .bufferTime(1000)
  .subscribe(tickers => debug('Produced %d items', tickers.length))

/**
 * Mqtt
 */

debug('Connecting to MQTT server at %s', MQTT_URL)

const client = mqtt.connect(MQTT_URL)

const next = tick => {
  const topic = `tickers/${tick.broker}`
  const message = JSON.stringify(tick)

  return client.publish(topic, message)
}

const error = err => {
  debug('Error happened: %s', err.message)
}

const complete = _ => {
  debug('Completed')
  debug('Disconnecting MQTT client')

  client.end(false, _ => debug('MQTT client disconnected'))
}

client.on('error', error)

client.on('connect', _ => {
  debug('MQTT client connected')

  ticker$.subscribe({
    next,
    error,
    complete
  })
})
