import test from 'ava'

import commitDrop from '../lib/commit-drop'

const SLOTS = [
  { id: 'a', price: 100 },
  { id: 'b', price: 105 },
  { id: 'c', price: 110 },
  { id: 'd', price: 115 },
  { id: 'e', price: 120 },
]

const commit = commitDrop({
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
    { id: 'c', price: 110 },
    { id: 'd', price: 115 },
    { id: 'e', price: 120 },
  ])
})
