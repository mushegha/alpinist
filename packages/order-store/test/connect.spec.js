import test from 'ava'

import { Observable } from 'rxjs/Rx'

import Store from '..'

import {
  tap
} from 'ramda'

const ORDERS = [
  {
    id  : 's1',
    gid      : 'g1',
    status   : 'new',
    agent    : 'a1',
    broker   : 'mock',
    symbol   : 'ethusd',
    side     : 'buy',
    price    : 500,
    quantity : 0.2
  }, {
    id  : 's1',
    status   : 'open',
    broker   : 'mock',
    symbol   : 'ethusd',
    side     : 'buy',
    price    : 501,
    quantity : 0.2
  }, {
    id  : 's1',
    status   : 'closed',
    broker   : 'mock',
    symbol   : 'ethusd',
    side     : 'buy',
    price    : 501.5,
    quantity : 0.2
  }, {
    id  : 's1',
    gid      : 'g2',
    status   : 'new',
    agent    : 'a1',
    broker   : 'mock',
    symbol   : 'ethusd',
    side     : 'sell',
    price    : 510,
    quantity : 0.2
  }, {
    id  : 's2',
    gid      : 'g2',
    status   : 'new',
    agent    : 'a1',
    broker   : 'mock',
    symbol   : 'ethusd',
    side     : 'buy',
    price    : 512,
    quantity : 0.2
  }
]

test.beforeEach(_ => Store().destroy())

test.serial('sink', async t => {
  const store = new Store()

  await store
    .allDocs('s1')
    .then(res => t.is(res.total_rows, 0))

  Observable
    .timer(0, 10)
    .take(ORDERS.length)
    .map(i => ORDERS[i])
    .subscribe(store.sink())

  await new Promise(r => setTimeout(r, 500))

  await store
    .get('s1')
    .then(doc => {
      t.pass()
    })

  await store
    .get('s2')
    .then(doc => {
      t.pass()
    })
})

test.serial('source', async t => {
  let log = []

  const store = new Store()

  const p = store
    .source()
    .map(order => log.push(order))
    .take(ORDERS.length)
    .toPromise()

  for (let i in ORDERS) {
    await store.putOrder(ORDERS[i])
  }

  await p

  t.is(log.length, 5)
})
