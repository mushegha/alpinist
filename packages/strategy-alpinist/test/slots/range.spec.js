
import test from 'ava'

import { range } from '../../lib/slots'

const SLOTS = [
  { _id: 'b', price: 200 },
  { _id: 'a', price: 100 },
  { _id: 'c', price: 300 }
]

test('sort', t => {
  t.deepEqual(
    range(-Infinity, +Infinity, SLOTS),
    [ { _id: 'a', price: 100 },
      { _id: 'b', price: 200 },
      { _id: 'c', price: 300 } ]
  )
})

test('slice', t => {
  t.deepEqual(
    range(0, 2, SLOTS),
    [ { _id: 'a', price: 100 },
      { _id: 'b', price: 200 } ]
  )

  t.deepEqual(
    range(0, -1, SLOTS),
    [ { _id: 'a', price: 100 },
      { _id: 'b', price: 200 } ]
  )
})
