import mqtt from 'mqtt'

import { Observable } from 'rxjs/Rx'

function source () {
  const client = mqtt.connect('mqtt://ec2-13-59-155-218.us-east-2.compute.amazonaws.com:8080')

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
