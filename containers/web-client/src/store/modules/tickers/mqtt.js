import mqtt from 'mqtt'

import { Observable } from 'rxjs/Rx'

function source () {
  const client = mqtt.connect('mqtt://178.62.246.62:9001')

  client.on('connect', function () {
    client.subscribe('tickers/+')
  })

  const selector = (_, buf) =>
    buf.toString()

  return Observable
    .fromEvent(client, 'message', selector)
    .map(JSON.parse)
}

export {
  source
}
