import test from 'ava'

import Store from '../lib/store'

import {
  getFromStore,
  putIntoStore
} from '../lib/fn'

const store = new Store()

test.serial('getFromStore', async  t => {
  const state = {
    _id: 'a',
    status: 'active',
    broker: 'exo'
  }

  await putIntoStore(store, state)

  await getFromStore(store, 'a')
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

  await putIntoStore(store, state1)
    .then(console.log)

  await putIntoStore(store, state2)
    .then(console.log)

  t.pass()
})

test.serial('getAllFromStore', async t => {
  const state1 = {
    _id: 'a',
    status: 'active',
    broker: 'exo'
  }

  const state2 = {
    _id: 'b',
    status: 'active',
    broker: 'hopar'
  }

  await putIntoStore(store, state1)
  await putIntoStore(store, state2)

  // await getAllFromStore(store, query)

  t.pass()
})
