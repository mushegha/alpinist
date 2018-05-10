import test from 'ava'

import Queue from '../lib/queue'

import { addOrderTo, getOrderFrom } from '../lib/fn'

const BUY_ORDER = {
  broker   : 'mock',
  symbol   : 'ethusd',
  side     : 'buy',
  price    : 502,
  quantity : 0.2
}

const SELL_ORDER = {
  broker   : 'mock',
  symbol   : 'ethusd',
  side     : 'sell',
  price    : 502,
  quantity : 0.2
}

test.beforeEach(async t => {
  const queue = Queue()

  await queue.empty()

  t.context = queue
})

test('add', async t => {
  const add = addOrderTo(t.context)

  const order = await add(BUY_ORDER)

  t.not(order.subject, undefined)
  t.not(order.time, undefined)
})

test('get', async t => {
  const queue = Queue()

  const get = getOrderFrom(t.context)

  const { subject } = await addOrderTo(t.context, BUY_ORDER)

  const order = await get(subject)

  t.not(order.subject, undefined)
  t.not(order.time, undefined)
})

