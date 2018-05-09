import test from 'ava'

import Queue from '../lib/queue'
import Observable from '../lib/observable'

import {
  appendFlipped
} from 'ramda-adjunct'

const queue = new Queue()

const BUY_ORDER = {
  broker   : 'mock',
  symbol   : 'ethusd',
  side     : 'buy',
  price    : 500,
  quantity : 0.2
}

const SELL_ORDER = {
  broker   : 'mock',
  symbol   : 'ethusd',
  side     : 'sell',
  price    : 500,
  quantity : 0.2
}

test('constructor', async t => {
  t.is(typeof Queue, 'function')
})

test('add', async t => {
  const observable = Observable
    .fromQueue(queue)
    .take(2)
    .reduce(appendFlipped, [])

  queue.add(BUY_ORDER)

  await observable
    .toPromise()
    .then(console.log)

  t.is(1, 1)
})
