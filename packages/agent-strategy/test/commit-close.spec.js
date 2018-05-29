import test from 'ava'

import commitDrop from '../lib/commit-drop'

const SLOTS = [
  { id: 'a', price: 99 },
  { id: 'b', price: 105 },
  { id: 'c', price: 110 },
]

const commit = commitDrop({
  sellLimit: 2,
  sellOffset: 1
})

test('none', t => {
  t.deepEqual(commit(109, SLOTS), SLOTS)
  t.deepEqual(commit(110, SLOTS), SLOTS)
})

test('some', t => {
  const [ A, B, C ] = SLOTS

  const result = commit(111, SLOTS)

  t.deepEqual(result, [ C ])
})
