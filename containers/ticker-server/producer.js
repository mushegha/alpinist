const mqtt = require('mqtt')

const Monitor = require('./lib/monitor')

//

const client = mqtt.connect('mqtt://178.62.246.62:1883')

const publish = tick => {
  const topic = `tickers/${tick.broker}`
  const message = JSON.stringify(tick)

  return client.publish(topic, message)
}

client.on('error', console.error)
client.on('connect', _ => Monitor().subscribe(publish))
