import test from 'ava'

import WebSocket from '../lib/ws'


test('type', t => {
  t.is(typeof WebSocket, 'function')
})
