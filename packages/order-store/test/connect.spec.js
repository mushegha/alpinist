import test from 'ava'

import { Observable } from 'rxjs/Rx'

import Store from '..'

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

test.beforeEach(_ => Store().destroy())

test.serial('source', async t => {
  let log = []

  const store = new Store()

  const p = store
    .source()
    .map(order => log.push(order))
    .take(2)
    .toPromise()

  for (let i in ORDERS) {
    await store.putOrder(ORDERS[i])
  }

  await p

  // console.log(log)

  t.is(log.length, 2)
})

test.serial('sink', async t => {
  const store = new Store()

  await store
    .allDocs('s1')
    .then(res => t.is(res.total_rows, 0))

  Observable
    // .from(ORDERS)
    .timer(0, 10)
    .take(2)
    .map(i => ORDERS[i])
    .subscribe(store.sink())

  await new Promise(r => setTimeout(r, 500))

  await store
    .get('s1')
    .then(doc => {
      t.is(doc.status, 'active')
    })
})

