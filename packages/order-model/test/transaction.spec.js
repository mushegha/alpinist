import test from 'ava'

import Order from '../lib/order'
import Transaction from '../lib/transaction'

const list = [
  {
    market: 'bitfinex',
    symbol: 'ethusd',
    type: 'market',
    side: 'buy',
    price: 500,
    amount: 1
  }, {
    market: 'bitfinex',
    symbol: 'ethusd',
    type: 'market',
    side: 'sell',
    price: 400,
    amount: 2
  }
]

test('init', t => {
  t.not(Transaction, undefined)
})

test('getters', t => {
  const orders = list.map(x => new Order(x))
  const {
    price,
    amount,
    side
  } = Transaction.create(orders)

  t.is(amount, 1)
  t.is(side, 'sell')
  t.is(price, 300)
})
