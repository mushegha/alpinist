import test from 'ava'

import { commitClose } from '../lib/slots'

const SLOTS = [
  { _id: 'a', price: 100 },
  { _id: 'b', price: 105 },
  { _id: 'c', price: 110 },
  { _id: 'd', price: 115 },
  { _id: 'e', price: 120 },
]

const commit = commitClose({
  limit_close: 2,
  limit_keep: 1
})

test('none', t => {
  const newSlots = commit(106, SLOTS)

  t.deepEqual(newSlots, SLOTS)
})

test('some', t => {
  const newSlots = commit(116, SLOTS)

  t.deepEqual(newSlots, [
    { _id: 'c', price: 110 },
    { _id: 'd', price: 115 },
    { _id: 'e', price: 120 },
  ])
})
