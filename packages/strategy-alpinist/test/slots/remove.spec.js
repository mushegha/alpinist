import test from 'ava'

import { remove } from '../../lib/slots'

const SLOTS = [
  { _id: 'b', price: 200 },
  { _id: 'a', price: 100 },
  { _id: 'c', price: 300 }
]

test('ok', t => {
  t.deepEqual(
    remove({ _id: 'b' }, SLOTS),
    [ { _id: 'a', price: 100 },
      { _id: 'c', price: 300 } ]
  )
})
