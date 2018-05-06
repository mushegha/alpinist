const mqtt = require('mqtt')

const { Observable } = require('rxjs/Rx')

const { prop, propEq  } = require('ramda')

function fromMqttTopic (topic) {
  const client = mqtt.connect('mqtt://localhost')

  client.on('connect', () => {
    client.subscribe(topic)
  })

  const selector = (topic, payload) => ({ topic, payload })

  const source = Observable
    .fromEvent(client, 'message', selector)
    .filter(propEq('topic', topic))
    .map(prop('payload'))

  return source
}

module.exports = fromMqttTopic

