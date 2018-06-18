const { Observable } = require('rxjs/Rx')

const connect = require('./client')

function OrdersObservable (opts = {}) {
  const { namespace = '+' } = opts

  const client = connect()

  const topic = `orders/${namespace}`

  const options = { qos: 2 }

  client.subscribe(topic, options)

  return Observable
    .fromEvent(client, 'message', (_, x) => x)
    .map(JSON.parse)
}


module.exports = OrdersObservable
