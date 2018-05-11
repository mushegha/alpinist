
import test from 'ava'

import Store from '../lib/store'

const createMiddleware = require('../lib/middleware')

test('init', async  t => {
  const context = {}

  const fn = createMiddleware()

  await fn(context, _ => Promise.resolve())

  t.not(context.store, undefined)
})
