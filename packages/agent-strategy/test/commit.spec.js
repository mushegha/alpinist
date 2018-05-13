import test from 'ava'

import commit from '../lib/commit'

const A = { id: 'a', price: 100, quantity: 1 }
const B = { id: 'b', price: 105, quantity: 2 }
const C = { id: 'c', price: 95, quantity: 2 }
const D = { id: 'd', price: 115, quantity: 2 }

test('full', t => {
  const options = {
    level_threshold: 5,
    weight_initial: 100,
    weight_up_b: 10,
    weight_up_k: 2,
    weight_down_b: 15,
    weight_down_k: 1.75,
    limit_close: 2,
    limit_keep: 1
  }

  const ticker = {
    bid_price: 120,
    ask_price: 121
  }

  const slots = commit(options, ticker, [ A, B, C, D ])

  t.is(slots.length, 3)
})
