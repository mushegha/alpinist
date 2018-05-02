import test from 'ava'

import Order from '../lib/order'

const CONTEXT = {
  market: 'bitfinex',
  symbol: 'ethusd',
  type: 'market'
}

const MEMBERS = [
  {
    side   : 'buy',
    price  : 500,
    amount : 0.1
  }, {
    side   : 'sell',
    price  : 400,
    amount : 0.2
  }
]

test('init', t => {
  t.not(Order, undefined)
})

test('static create', t => {
  const order = new Order(CONTEXT, MEMBERS)

  t.not(order.subject, undefined)
  t.not(order.time, undefined)

  t.is(order.status, 'new')
})
