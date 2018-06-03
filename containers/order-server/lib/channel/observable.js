const { Observable } = require('rxjs/Rx')

const connect = require('./client')


function OrdersChannelObservable (topic = '+') {
  const client = connect()

  client.subscribe(`orders/${topic}`)

  return Observable
    .fromEvent(client, 'message', (_, x) => x)
    .map(JSON.parse)
}


module.exports = OrdersChannelObservable
