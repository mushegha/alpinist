import test from 'ava'

import {
  dissoc,
  whereEq
} from 'ramda'

import {
  isString,
  resolveP
} from 'ramda-adjunct'


import { create } from '../lib/routes'

const call = (ctx = {}) => {
  const fn = create()
  return fn(ctx, _ => resolveP(ctx))
}

test('valid', async t => {
  const request = {
    body: {
      operation : 'buy',
      kind      : 'market',
      exchange  : 'bitfinex',
      symbol    : 'ethusd',
      quantity  : 400,
      price     : 500,
      etc       : 'xxx'
    }
  }

  const assertResponse = ({ body }) => {
    t.true(isString(body.subject), 'generate `subject`')

    t.is(body.status, 'new')

    t.true(whereEq(dissoc('etc', request.body), body))
    t.false(whereEq(request.body, body))
  }

  await call({ request })
    .then(assertResponse)
})
