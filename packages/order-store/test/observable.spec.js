import test from 'ava'

import { Observable } from 'rxjs/Rx'

import Store from '../lib/store'

import { putIntoStore } from '../lib/fn'

import { fromStore } from '../lib/observable'

const ORDERS = [
  {
    _id  : 's1',
    status   : 'new',
    broker   : 'mock',
    symbol   : 'ethusd',
    side     : 'buy',
    price    : 501,
    quantity : 0.2
  }, {
    _id  : 's1',
    status   : 'active'
  }
]

test('fromStore', async t => {
  const store = new Store()

  let log = []

  fromStore(store)
    .subscribe(order => log.push(order))

  for (let i in ORDERS) {
    await putIntoStore(store, ORDERS[i])
  }

  t.pass()
})

test('intoStore', async t => {
  const store = new Store()

  const observable = Observable
    .from(ORDERS)
    .subscribe(putIntoStore(store))

  await new Promise(r => setTimeout(r, 100))

  t.pass()
})
