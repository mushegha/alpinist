import test from 'ava'

import { commitOpen } from '../lib/slots'

const commit = commitOpen({
  level_threshold: 5,
  weight_initial: 100,
  weight_up_b: 10,
  weight_up_k: 2,
  weight_down_b: 15,
  weight_down_k: 1.75
})

test('empty', t => {
  const price = 100

  const oldSlots = []

  const newSlots = commit(price, oldSlots)

  t.deepEqual(newSlots, [
    { price: 100, volume: 1 }
  ])
})

test('some', t => {
  const oldSlots = [
    { price: 100, volume: 1 }
  ]

  const newSlotsUp = commit(105, oldSlots)
  const newSlotsDown = commit(95, oldSlots)

  t.deepEqual(newSlotsUp, [
    { price: 100, volume: 1 },
    { price: 105, volume: 2 }
  ])

  t.deepEqual(newSlotsDown, [
    { price: 95, volume: 2 },
    { price: 100, volume: 1 }
  ])
})

test('none', t => {
  const oldSlots = [
    { price: 100, volume: 1 }
  ]

  const newSlotsUp = commit(104, oldSlots)

  t.deepEqual(newSlotsUp, [
    { price: 100, volume: 1 }
  ])
})
