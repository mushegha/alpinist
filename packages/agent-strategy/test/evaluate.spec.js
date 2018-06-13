import test from 'ava'

import strategy from '..'

const agent = {
  id: 'a1',
  ticker: {
    broker: 'bitfinex',
    symbol: 'neousd'
  },
  settings: {
    priceThreshold: 5,
    buyIn: 100,
    buyInNextUp: { k: 2, b: 25 },
    buyInNextDown: { k: 1.75, b: 15 },
    sellLimit: 1,
    sellOffset: 1
  }
}

const ticker = {
  broker: 'bitfinex',
  symbol: 'neousd',
  bid_price: 111,
  ask_price: 112.5
}

const orders = [
  {
    id: 'o1',
    buy_price: 100,
    quantity: 1
  }, {
    id: 'o2',
    buy_price: 105,
    quantity: 1
  }
]

const evaluate = strategy(agent, ticker)

test('empty', t => {
  const [ A ] = evaluate([])

  t.is(A.buy_price, 112.5)
})

test('full', t => {
  const [ A, C ] = evaluate(orders)

  t.is(A.id, 'o1')
  t.is(A.side, 'sell')
  t.is(A.sell_price, ticker.bid_price)

  t.is(C.side, 'buy')
  t.is(C.buy_price, ticker.ask_price)
})
