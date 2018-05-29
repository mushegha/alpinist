import test from 'ava'

import PouchDB from 'pouchdb'

import orderMethods from '..'

const SEED = require('./seed.json')

/**
 * Setup
 */

PouchDB
  .plugin(orderMethods)

/**
 * Init
 */

const store = new PouchDB('tmp')

/**
 * Hooks
 */

test.before(async _ => {
  await store.bulkDocs(SEED)
})

test.after.always(_ => {
  return store.destroy()
})

/**
 * Tests
 */

test.serial('get order', async t => {
  await store
    .getOrder('o1')
    .then(order => t.is(order.id, 'o1'))

  await store
    .getOrder({ id: 'o2' })
    .then(order => t.is(order.id, 'o2'))
})

test.serial('create order', async  t => {
  const order = {
    agent: 'a2',
    broker: 'cexio',
    symbol: 'btcusd',
    quantity: 0.1
  }

  await store
    .putOrder(order)
    .then(res => store.get(res.id))
    .then(res => {
      t.not(res.id, undefined)
      t.is(res.status, 'new')
    })
})

test.serial('update order', async  t => {
  const order = {
    id: 'o2',
    status: 'closed',
    price: 475
  }

  const initial = await store.get('o2')

  const final = await store
    .putOrder(order)
    .then(_ => store.get('o2'))

  t.is(initial._id, final._id)

  t.not(initial.time, final.time)
  t.not(initial.status, final.status)
})

test.serial('get order revisions', async t => {
  await store
    .getOrderRevs('o1')
    .then(revs => t.is(revs.length, 1))

  await store
    .getOrderRevs('o2')
    .then(revs => t.is(revs.length, 2))
})
