import test from 'ava'

import Order from '../lib/order'

const base = {
  market: 'bitfinex',
  symbol: 'ethusd',
  type: 'market',
  side: 'buy',
  price: 500,
  amount: 0.1
}

test('init', t => {
  t.not(Order, undefined)
})

test('static create', t => {
  const order = Order.create(base)

  t.is(typeof order._id, 'string')
  t.is(order.status, 'new')
})
