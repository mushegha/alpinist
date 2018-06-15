const debug = require('debug')('alpinist:mqtt:orders')

const connect = require('./client')

function OrdersObserver () {
  debug('Initializing observer')

  const client = connect()

  const next = order => {
    debug('Received new order. Publishing...')

    const topic = `orders/${order.broker}`
    const message = JSON.stringify(order)

    const options = { qos: 2 }

    return client.publish(topic, message)
  }

  const error = err => {
    debug('Error happened: %s', err.message)
    debug('Disconnecting...')

    client.end(false)
  }

  const complete = _ => {
    debug('Completed')
    debug('Disconnecting... ')

    client.end(false)
  }

  return {
    next,
    error,
    complete
  }
}

module.exports = OrdersObserver
