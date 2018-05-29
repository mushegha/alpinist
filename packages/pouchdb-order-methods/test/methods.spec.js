import test from 'ava'

import PouchDB from 'pouchdb'

import orderMethods from '..'

PouchDB
  .plugin(orderMethods)

const store = new PouchDB('tmp')

/**
 * Hooks
 */

test.before(async _ => {
  const { rev } = await store.put({
    _id: 'a',
    gid: 'g',
    status: 'pre',
    broker: 'x'
  })

  await store.put({
    _id: 'a',
    gid: 'g',
    _rev: rev,
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

test.serial('get order', async t => {
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

test.serial('get order revisions', async t => {
  await store
    .getOrderRevs('a')
    .then(revs => {
      t.is(revs.length, 2)
    })
})

test.serial('create order', async  t => {
  await store
    .putOrder({
      gid: 'g'
    })
    .then(res => store.get(res.id))
    .then(res => {
      t.not(res.id, undefined)
      t.is(res.status, 'new')
    })
})

test.serial('update order', async  t => {
  const initial = await store.get('a')

  const final = await store
    .putOrder({
      id: 'a',
      status: 'completed'
    })
    .then(_ => store.get('a'))

  t.is(initial._id, final._id)

  t.not(initial.time, final.time)
  t.not(initial.status, final.status)
})

