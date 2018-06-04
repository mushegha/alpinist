const {
  Observable,
  Subject
} = require('rxjs/Rx')

const {
  Order
} = require('bitfinex-api-node/lib/models')

const {
  merge,
  assoc,
  compose
} = require('ramda')

const {
  renameKeys
} = require('ramda-adjunct')

const timestamp = x => assoc('ts', Date.now(), x)

function fromOrder (order) {
  const subject = new Subject()

  const open = compose(
    x => subject.next(x),
    assoc('status', 'open'),
    Order.unserialize
  )

  const close = compose(
    _ => subject.complete(),
    x => subject.next(x),
    renameKeys({ 'priceAvg': 'price' }),
    assoc('status', 'closed'),
    Order.unserialize
  )

  const reject = compose(
    res => subject.next(res),
    assoc('status', 'rejected'),
    timestamp,
    merge(order)
  )

  order.on('close', close)

  return Observable.create(observer => {
    subject
      .subscribe(observer)

    order.registerListeners()

    order
      .submit()
      .then(open)
      .catch(reject)

    return () => {
      order.removeListeners()
    }
  })
}

module.exports = {
  fromOrder
}
