const mqtt = require('mqtt')

const { Observable } = require('rxjs/Rx')

function fromMqttTopic (topic) {
  const client = mqtt.connect('mqtt://localhost')

  client.on('connect', () => {
    client.subscribe(topic)
  })

  const selector = (name, payload) => {
    if (name === topic)
      return payload
  }

  return Observable
    .fromEvent(client, 'message', selector)
}

module.exports = fromMqttTopic

