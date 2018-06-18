import test from 'ava'

import H from '../lib/strategy/helpers'

const A = { id: 'a', buy_price: 100 }
const B = { id: 'b', buy_price: 200 }
const C = { id: 'c', buy_price: 300 }

const SLOTS = [ B, A, C ]

test('add', t => {
  const { add } = H

  const slots1 = add({ buy_price: 200 }, [])
  const slots2 = add({ buy_price: 100 }, slots1)
  const slots3 = add({ buy_price: 300 }, slots2)

  const [ A, B, C ] = slots3

  t.is(A.buy_price, 100)
})

test('remove', t => {
  const { remove } = H

  t.deepEqual(remove(B, SLOTS), [ A, C ])
  t.deepEqual(remove(C, SLOTS), [ A, B ])
})

test('diff', t => {
  const { diff } = H

  t.deepEqual(diff([A, B], [B, C]), [A])
})

test('range', t => {
  const { range } = H

  t.deepEqual(range(0, 2, SLOTS), [ A, B ])
  t.deepEqual(range(0, -1, SLOTS), [ A, B ])
})

test('rangeByPrice', t => {
  const { rangeByPrice } = H

  t.deepEqual(rangeByPrice(0, 100, SLOTS), [])
  t.deepEqual(rangeByPrice(50, 150, SLOTS), [ A ])
  t.deepEqual(rangeByPrice(100, 200, SLOTS), [ A ])
})

test('minByPrice', t => {
  t.deepEqual(H.minByPrice(SLOTS), A)
})

test('maxByPrice', t => {
  t.deepEqual(H.maxByPrice(SLOTS), C)
})
