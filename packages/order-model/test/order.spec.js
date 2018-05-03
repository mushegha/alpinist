import test from 'ava'

import Order from '../lib/order'

const CONTEXT = {
  market: 'bitfinex',
  symbol: 'ethusd',
  type: 'market'
}

const CONTEXT_FULL = {
  market: 'bitfinex',
  symbol: 'ethusd',
  type: 'market',
  status: 'closed',
  side   : 'sell',
  price  : 300,
  amount : 0.1
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
  const order = new Order(CONTEXT, MEMBERS)

  t.not(order.subject, undefined)
  t.not(order.time, undefined)

  t.is(order.status, 'new')
})

test('toJSON', t => {
  const order = new Order(CONTEXT, MEMBERS)

  const o = order.toJSON()

  t.is(o.side, 'sell')
  t.is(o.price, 300)
  t.is(o.amount, 0.1)

  const order2 = new Order(CONTEXT_FULL)

  const o2 = order2.toJSON()

  t.is(o2.side, 'sell')
  t.is(o2.price, 300)
  t.is(o2.amount, 0.1)
})
