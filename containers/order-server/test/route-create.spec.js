import test from 'ava'

import mqtt from 'mqtt'

import { whereEq } from 'ramda'

import {
  isString,
  resolveP
} from 'ramda-adjunct'

import { create } from '../lib/koa-routes'

import Queue from '@alpinist/order-queue'

test.beforeEach(async t => {
  t.context.queue = new Queue()
})

test('valid', async t => {
  const { context } = t

  context.request = {
    body: {
      side     : 'buy',
      broker   : 'bitfinex',
      symbol   : 'ethusd',
      quantity : 400,
      price    : 500,
      etc      : 'xxx'
    }
  }

  const call = (ctx = {}) => {
    const fn = create()
    return fn(ctx, _ => resolveP(ctx))
  }

  const assertResponse = ({ body }) => {
    t.true(isString(body.subject), 'generate `subject`')
    t.true(whereEq(context.request.body, body))
  }

  await call(context)
    .then(assertResponse)
})
