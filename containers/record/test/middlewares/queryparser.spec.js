import test from 'ava'

import queryparser from '../../lib/middlewares/queryparser'

test('initial', async t => {
  t.is(typeof queryparser(), 'function', 'returns middleware')
})
