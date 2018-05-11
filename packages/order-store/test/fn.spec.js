import test from 'ava'

import delay from 'delay'

import Store from '../lib/store'

import {
  getFromStore,
  putIntoStore,
  findAllFromStore
} from '../lib/fn'

test.beforeEach(async t => {
  const db = new Store()

  await db.destroy()

  t.context = new Store()
})

test.serial('getFromStore', async  t => {
  const state = {
    _id: 'a',
    status: 'active',
    broker: 'exo'
  }

  await putIntoStore(t.context, state)

  await getFromStore(t.context, 'a')
    .then(console.log)

  t.pass()
})

test.serial('putIntoStore', async t => {
  const state1 = {
    _id: 'a',
    status: 'active',
    broker: 'exo'
  }

  const state2 = {
    _id: 'a',
    status: 'completed'
  }

  await putIntoStore(t.context, state1)
    .then(console.log)

  await putIntoStore(t.context, state2)
    .then(console.log)

  t.pass()
})

test.serial('findAllFromStore', async t => {
  const A = {
    _id: 'a',
    status: 'active',
    broker: 'exo'
  }

  const B = {
    _id: 'b',
    status: 'completed',
    broker: 'hopar'
  }

  const C = {
    _id: 'c',
    status: 'active',
    broker: 'venus'
  }

  const put = putIntoStore(t.context)
  const findAll = findAllFromStore(t.context)

  await put(A)

  const time = Date.now()
  await delay(1)

  await put(B)
  await put(C)

  const query = {
    status: 'active',
    timestamp: { $gt: time }
  }

  await findAll(query)
    .then(members => t.is(members.length, 1))

  t.pass()
})
