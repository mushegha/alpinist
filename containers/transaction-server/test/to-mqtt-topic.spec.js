
import test from 'ava'

import toMqttTopic from '../lib/rx-operators/to-mqtt-topic'

import mqtt from 'mqtt'

import { of } from 'rxjs/observable/of'
import { fromEvent } from 'rxjs/observable/fromEvent'

test.cb('init', t => {
  const client = mqtt.connect('mqtt://localhost')

  client.on('connect', () => {
    client.subscribe('orders')
  })

  client.on('message', (topic, buf) => {
    t.is(buf.toString(), 'a')
    t.end()
  })

  const source = of('a')
    .pipe(toMqttTopic('orders'))
    .subscribe(console.log)
})
