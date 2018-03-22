import test from 'ava'

import H from '../lib/helpers'

const right = [
  { priceOpen: 93 },
  { priceOpen: 100 },
  { priceOpen: 106 }
]

const left = [
  { priceOpen: 111 },
  { priceOpen: 117 }
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
    [3, 2]
  )

  t.deepEqual(
    $(108, [ ...left, ...right ]),
    [3, 2],
    'should sort'
  )

  t.deepEqual(
    $(111, slots),
    [3, 2],
    'should keep strictly less on right'
  )

  t.deepEqual(
    $(120, []),
    [0, 0],
    'should keep if empty'
  )
})
