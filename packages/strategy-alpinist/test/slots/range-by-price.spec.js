import test from 'ava'

import { rangeByPrice } from '../../lib/slots'

const SLOTS = [
  { _id: 'b', price: 200 },
  { _id: 'a', price: 100 },
  { _id: 'c', price: 300 }
]

test('sort', t => {
  t.deepEqual(
    rangeByPrice(-Infinity, +Infinity, SLOTS),
    [ { _id: 'a', price: 100 },
      { _id: 'b', price: 200 },
      { _id: 'c', price: 300 } ]
  )

})

test('ok', t => {
  const rangeOf = (min, max) =>
    rangeByPrice(min, max, SLOTS)

  t.deepEqual(
    rangeOf(0, 100),
    []
  )

  t.deepEqual(
    rangeOf(50, 150),
    [ { _id: 'a', price: 100 } ]
  )

  t.deepEqual(
    rangeOf(100, 200),
    [ { _id: 'a', price: 100 } ]
  )
})
