import test from 'ava'

import compile from '../lib'

const A = { id: 'a', price: 100, quantity: 1 }
const B = { id: 'b', price: 105, quantity: 2 }
const C = { id: 'c', price: 95, quantity: 2 }
const D = { id: 'd', price: 115, quantity: 2 }

const options = {
  agent: 'agent1',
  broker: 'cexio',
  symbol: 'btcusd',
  level_threshold: 5,
  weight_initial: 100,
  weight_up_b: 10,
  weight_up_k: 2,
  weight_down_b: 15,
  weight_down_k: 1.75,
  limit_close: 2,
  limit_keep: 1
}

test('full', t => {
  const ticker = {
    bid_price: 120,
    ask_price: 121
  }

  const xx = compile(options, ticker, [ A, B, C, D ])

  console.log(xx)

  t.pass()
})
