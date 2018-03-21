import test from 'ava'

import H from '../lib/helpers'

const right = [
  { openPrice: 1 },
  { openPrice: 2 }
]

const left = [
  { openPrice: 3 },
  { openPrice: 4 }
]

const slots = [
  ...right,
  ...left
]

const opts = {
  sellLimit: 3,
  keepLimit: 1
}

test('splitByPL', t => {
  const $ = H.splitByPL

  t.deepEqual(
    $(2.5, slots),
    [right, left]
  )

  t.deepEqual(
    $(2.5, [ ...left, ...right ]),
    [right, left],
    'should sort'
  )

  t.deepEqual(
    $(3, slots),
    [right, left],
    'should keep strictly less on right'
  )

  t.deepEqual(
    $(3, []),
    [[], []],
    'should keep if empty'
  )
})

test('isEligibleToSell', t => {
  const $ = mark =>
    H.isEligibleToSell(opts, mark, slots)

  t.false($(3))
  t.true($(3.5))
  t.false($(4.5))
})

test('renderSlotsToSell', t => {
  const $ = mark =>
    H.renderSlotsToSell(opts, mark, slots)

  t.deepEqual($(3), [])
  t.deepEqual($(4.5), [])

  t.deepEqual(
    $(4),
    [ { openPrice: 1 },
      { openPrice: 2 },
      { openPrice: 3 } ]
  )
})
