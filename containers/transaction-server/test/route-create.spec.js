import test from 'ava'

import mqtt from 'mqtt'

import {
  dissoc,
  whereEq
} from 'ramda'

import {
  isString,
  resolveP
} from 'ramda-adjunct'

import { create } from '../lib/koa-routes'

test.beforeEach(async t => {
  const client = mqtt.connect('mqtt://localhost')

  await new Promise(done => {
    client.on('connect', done)
  })

  client.subscribe('orders')

  client.on('message', (topic, buffer) => {
    const data = JSON.parse(buffer.toString())

    if (data.status !== 'new') {
      return
    }

    setTimeout(() => {
      data.status = 'created'
      const res = JSON.stringify(data)
      client.publish(`orders`, res)
    }, 50)
  })

  t.context.mqtt = client
})

test('valid', async t => {
  const { context } = t

  context.request = {
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

  const call = (ctx = {}) => {
    const fn = create()
    return fn(ctx, _ => resolveP(ctx))
  }

  const assertResponse = ({ body }) => {
    t.true(isString(body.subject), 'generate `subject`')

    t.is(body.status, 'new')

    t.true(whereEq(dissoc('etc', context.request.body), body))
    t.false(whereEq(context.request.body, body))
  }

  await call(context)
    .then(assertResponse)

  await new Promise(r => setTimeout(r, 2000))
})
