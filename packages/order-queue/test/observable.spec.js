import test from 'ava'

import { appendFlipped } from 'ramda-adjunct'


import Queue from '../lib/queue'
import Observable from '../lib/observable'

import { addOrderTo } from '../lib/fn'


const BUY_ORDER = {
  broker   : 'mock',
  symbol   : 'ethusd',
  side     : 'buy',
  price    : 501,
  quantity : 0.2
}

const SELL_ORDER = {
  broker   : 'mock',
  symbol   : 'ethusd',
  side     : 'sell',
  price    : 499,
  quantity : 0.2
}

test.beforeEach(async t => {
  const queue = Queue()

  await queue.empty()

  t.context = queue
})

test('observe', async t => {
  const add = addOrderTo(t.context)

  const observable = Observable
    .fromQueue(t.context)
    .take(4)
    .reduce(appendFlipped, [])

  await add(BUY_ORDER)
  await add(SELL_ORDER)

  await observable
    .toPromise()
    .then(states => {
      t.is(states.length, 4)
    })
})
