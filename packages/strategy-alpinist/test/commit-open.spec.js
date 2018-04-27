import test from 'ava'

import { commitOpen } from '../lib/slots'

const commit = commitOpen({
  level_threshold: 5,
  investment_initial: 100,
  investment_up_b: 10,
  investment_up_k: 2,
  investment_down_b: 15,
  investment_down_k: 1.75
})

test('empty', t => {
  const level = 100

  const oldSlots = []

  const newSlots = commit(level, oldSlots)

  t.deepEqual(newSlots, [
    { level: 100, weight: 1 }
  ])
})

test('some', t => {
  const oldSlots = [
    { level: 100, weight: 1 }
  ]

  const newSlotsUp = commit(105, oldSlots)
  const newSlotsDown = commit(95, oldSlots)

  t.deepEqual(newSlotsUp, [
    { level: 100, weight: 1 },
    { level: 105, weight: 2 }
  ])

  t.deepEqual(newSlotsDown, [
    { level: 95, weight: 2 },
    { level: 100, weight: 1 }
  ])
})

test('none', t => {
  const oldSlots = [
    { level: 100, weight: 1 }
  ]

  const newSlotsUp = commit(104, oldSlots)

  t.deepEqual(newSlotsUp, [
    { level: 100, weight: 1 }
  ])
})
