import test from 'ava'

// import { Observable } from 'rxjs/Rx'

import { appendFlipped } from 'ramda-adjunct'

import Store from '..'

import StoreObservable from '../lib/observable'

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
  let log = []

  const p = StoreObservable()
    .map(order => log.push(order))
    .take(2)
    .toPromise()

  const store = new Store()

  for (let i in ORDERS) {
    await store.putOrder(ORDERS[i])
  }

  await p

  console.log(log)

  t.is(log.length, 2)
})
