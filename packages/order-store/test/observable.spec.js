import test from 'ava'

import { Observable } from 'rxjs/Rx'

import { appendFlipped } from 'ramda-adjunct'

import Store from '..'

import { fromStore } from '../lib/observable'

const ORDERS = [
  {
    id  : 's1',
    status   : 'new',
    broker   : 'mock',
    symbol   : 'ethusd',
    side     : 'buy',
    price    : 501,
    quantity : 0.2
  }, {
    id  : 's1',
    status   : 'active'
  }
]

test('fromStore', async t => {
  const store = new Store()

  let log = []

  const p = fromStore(store)
    .map(order => log.push(order))
    .toPromise()

  for (let i in ORDERS) {
    await store.putOrder(ORDERS[i])
  }

  await store.close()

  await new Promise(r => setTimeout(r, 100))

  t.is(log.length, 2)
})
