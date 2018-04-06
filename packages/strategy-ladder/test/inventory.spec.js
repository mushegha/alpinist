import test from 'ava'

import H from '../lib/inventory-helpers'

const A = {
  id: 'a',
  amount: 1,
  orderOpen: {
    price: 10
  }
}

const B = {
  id: 'b',
  amount: 1,
  orderOpen: {
    price: 20
  }
}

const C = {
  id: 'c',
  amount: 1,
  orderOpen: {
    price: 30
  }
}

test('lowest', t => {
  t.deepEqual(H.lowest([A, B, C]), A)
  t.deepEqual(H.lowest([C, A, B]), A, 'should sort')
})

test('highest', t => {
  t.deepEqual(H.highest([A, B, C]), C)
  t.deepEqual(H.highest([C, A, B]), C, 'should sort')
})

test('untilMark', t => {
  t.deepEqual(H.untilMark(15, [A, B, C]), [A])
  t.deepEqual(H.untilMark(20, [A, B, C]), [A, B], 'include mark')
  t.deepEqual(H.untilMark(20, [B, A, C]), [A, B], 'should sort')
})

test('untilMark', t => {
  t.is(H.totalAmount([A, B, C]), 60)
  t.is(H.totalAmount([A]), 10)
  t.is(H.totalAmount([]), 0)
})
