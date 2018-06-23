import test from 'ava'

import Client from '../lib/ws'

test('type', t => {
  t.is(typeof Client, 'function')
})
