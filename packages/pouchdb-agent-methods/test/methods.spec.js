import test from 'ava'

import PouchDB from 'pouchdb'

import agentMethods from '..'

const AGENTS = require('./seed.json')

PouchDB.plugin(agentMethods)

let db = new PouchDB('db-' + Date.now())

/**
 * Hooks
 */

test.before(async _ => {
  const ps = AGENTS
    .map(x => {
      x._id = x.id
      return x
    })
    .map(x => db.put(x))

  return Promise.all(ps)
})

test.after.always(_ => db.destroy())

/**
 * Tests
 */

test.serial('get agent', async t => {
  await db
    .getAgent('a1')
    .then(agent => {
      t.true(agent.isActive)
    })

  await db
    .getAgent({ id: 'a2' })
    .then(agent => {
      t.false(agent.isActive)
    })
})

test.serial('create agent', async  t => {
  const ticker = {
    broker: 'cexio',
    symbol: 'ethusd'
  }

  const settings = {
    priceThreshold: 10,
    buyIn: 500
  }

  await db
    .putAgent({
      ticker,
      settings
    })
    .then(res => db.get(res.id))
    .then(res => {
      t.not(res.id, undefined)
      t.deepEqual(res.ticker, ticker)
    })
})

test.serial('update agent', async  t => {
  const initial = await db.get('a1')

  const final = await db
    .putAgent({
      id: 'a1',
      isActive: false
    })
    .then(_ => db.get('a1'))

  t.is(initial._id, final._id)

  t.not(initial.isActive, final.isActive)
})
