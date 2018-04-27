import test from 'ava'

import { commitClose } from '../lib/slots'

const SLOTS = [
  { level: 100 },
  { level: 105 },
  { level: 110 },
  { level: 115 },
  { level: 120 },
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
    { level: 110 },
    { level: 115 },
    { level: 120 },
  ])
})
