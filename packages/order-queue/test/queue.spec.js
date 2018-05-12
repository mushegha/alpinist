import test from 'ava'

import Queue from '../lib/queue'

test('constructor', async t => {
  t.is(typeof Queue, 'function')
  t.is(typeof Queue(), 'object')
})
