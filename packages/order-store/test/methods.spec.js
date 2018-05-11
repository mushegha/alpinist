import test from 'ava'

import Store from '..'

const store = new Store()

/**
 * Hooks
 */

test.before(_ => {
  return store.put({
    _id: 'a',
    status: 'new',
    broker: 'x'
  })
})

test.after.always(_ => {
  return store.destroy()
})

/**
 * Tests
 */

test.serial('getOrder', async t => {
  await store
    .getOrder('a')
    .then(order => {
      t.is(order.status, 'new')
    })

  await store
    .getOrder({ id: 'a' })
    .then(order => {
      t.is(order.id, 'a')
    })
})

test.serial('putOrder', async  t => {
  const store = new Store()

  const initial = await store.get('a')

  const final = await store
    .putOrder({
      id: 'a',
      status: 'completed'
    })
    .then(_ => store.get('a'))

  t.is(initial._id, final._id)

  t.not(initial.timestamp, final.timestamp)
  t.not(initial.status, final.status)
})

test.serial('addOrder', async  t => {
  const store = new Store()

  const res1 = await store
    .addOrder({
      status: 'new'
    })
    .then(res => {
      t.not(res.id, undefined)
    })

  t.pass()
})
