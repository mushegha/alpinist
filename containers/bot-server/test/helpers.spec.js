import test from 'ava'

import H from '../lib/helpers'

const right = [
  { openPrice: 93 },
  { openPrice: 100 },
  { openPrice: 106 }
]

const left = [
  { openPrice: 111 },
  { openPrice: 117 }
]

const slots = [
  ...right,
  ...left
]

const opts = {
  // buy config
  initialInvestment: 50,
  treshold: 5,
  upK: 1,
  upB: 25,
  downK: 2,
  downB: 0,
  // sell config
  sellLimit: 4,
  keepLimit: 1
}

test('splitByPL', t => {
  const $ = H.splitByPL

  t.deepEqual(
    $(108, slots),
    [right, left]
  )

  t.deepEqual(
    $(108, [ ...left, ...right ]),
    [right, left],
    'should sort'
  )

  t.deepEqual(
    $(111, slots),
    [right, left],
    'should keep strictly less on right'
  )

  t.deepEqual(
    $(120, []),
    [[], []],
    'should keep if empty'
  )
})

test('isEligibleToSell', t => {
  const $ = mark =>
    H.isEligibleToSell(opts, mark, slots)

  t.false($(102))
  t.true($(112))
  t.false($(118))
})

test('renderSlotsToSell', t => {
  const $ = mark =>
    H.renderSlotsToSell(opts, mark, slots)

  t.deepEqual($(3), [])
  t.deepEqual($(4.5), [])

  t.deepEqual(
    $(112),
    [ ...right,
      { openPrice: 111 }]
  )
})

test('getInvestment', t => {
  const $ = (mark, arr = slots) =>
    H.getInvestment(opts, mark, arr)

  t.is($(100), void 0)
  t.is($(100, []), 50)

  t.is($(123), 75)
  t.is($(87), 100)
})

test('renderSlotsToBuy', t => {
  const $ = (mark, arr = slots) =>
    H.renderSlotsToBuy(opts, mark, arr)

  t.deepEqual($(100), [])
  t.deepEqual(
    $(100, []),
    {
      investment: 50,
      openPrice: 100
    }
  )

  t.deepEqual(
    $(123),
    {
      investment: 75,
      openPrice: 123
    }
  )

  t.deepEqual(
    $(87),
    {
      investment: 100,
      openPrice: 87
    }
  )
})
