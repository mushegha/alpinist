const mqtt = require('mqtt')

const { Observable } = require('rxjs/Rx')

function toMqttTopic (topic) {
  const client = mqtt.connect('mqtt://localhost')

  return payload => {

    const subscribe = observer => {
      const callback = err => {
        if (err) {
          observer.error(err)
        } else {
          observer.complete()
        }
      }

      client.publish(topic, payload, callback)
    }

    return Observable.create(subscribe)
  }
}

module.exports = toMqttTopic
