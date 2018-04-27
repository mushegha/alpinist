import test from 'ava'

import { commitOpen } from '../lib/slots'

test('commitOpen', t => {
  t.is(typeof commitOpen, 'function')
})
