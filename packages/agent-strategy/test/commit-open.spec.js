import test from 'ava'

import commitFill from '../lib/commit-fill'

const commit = commitFill({
  priceThreshold: 5,
  buyIn: 100,
  buyInNextUp: { k: 2, b: 10 },
  buyInNextDown: { k: 1.75, b: 15 }
})

test('empty', t => {
  const [ slot ] = commit(100, [])

  t.is(slot.price, 100)
  t.is(slot.quantity, 1)
})

test('some', t => {
  const oldSlots = [
    { price: 100, quantity: 1 }
  ]

  const [ upA, upB ] = commit(105, oldSlots)

  t.is(upB.price, 105)
  t.is(upB.quantity, 2)

  const [ downA, downB ] = commit(95, oldSlots)

  t.is(downA.price, 95)
  t.is(downA.quantity, 2)
})

test('none', t => {
  const oldSlots = [
    { price: 100, quantity: 1 }
  ]

  const [ xA, xB ] = commit(104, oldSlots)

  t.is(xB, undefined)
})
