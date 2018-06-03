const debug = require('debug')('alpinist:orders')

const connect = require('./client')

function OrdersChannelObserver () {
  const client = connect()

  const next = order => {
    // console.log(order)
    debug('Received new order. Publishing...')

    const topic = `orders/${order.broker}`
    const message = JSON.stringify(order)

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

module.exports = OrdersChannelObserver
