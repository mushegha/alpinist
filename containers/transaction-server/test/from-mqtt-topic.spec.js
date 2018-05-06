import test from 'ava'

import fromMqttTopic from '../lib/rx-operators/from-mqtt-topic'

import mqtt from 'mqtt'

test.cb('init', t => {
  const source = fromMqttTopic('orders')
    .take(3)
    .reduce((acc, payload) => {
      return acc + payload
    }, '')

  const client = mqtt.connect('mqtt://localhost')
  client.on('connect', () => {
    client.publish('orders', 'a')
    client.publish('orders', 'b')
    client.publish('test', 'c')
    client.publish('orders', 'd')
  })

  const subscriber = source.subscribe(
    x => t.is(x, 'abd'),
    console.error,
    _ => t.end()
  )
})
