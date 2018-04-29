import test from 'ava'

import { add } from '../../lib/slots'

const VALID = {
  price  : 20,
  volume : 5
}

test('append', t => {
  const list1 = add(VALID, [])
  const list2 = add(VALID, list1)

  t.is(list1.length, 1)
  t.is(list2.length, 2)
})


test('#_id', t => {
  const [{ _id: id1 }] = add(VALID, [])
  const [{ _id: id2 }] = add(VALID, [])

  t.is(typeof id1, 'string')
  t.is(typeof id2, 'string')

  t.not(id1, id2, 'no duplicates')
})

test('#isOpen', t => {
  const [{ isOpen }] = add(VALID, [])

  t.true(isOpen)
})
