import test from 'ava'

import Store from '..'

const AGENTS = require('./seed.json')

const store = new Store()

/**
 * Hooks
 */

test.before(async _ => {
  const ps = AGENTS
    .map(x => {
      x._id = x.id
      return x
    })
    .map(x => store.put(x))

  return Promise.all(ps)
})

test.after.always(_ => {
  return store.destroy()
})

/**
 * Tests
 */

test.serial('get agent', async t => {
  await store
    .getAgent('a1')
    .then(agent => {
      t.true(agent.isActive)
    })

  await store
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

  await store
    .putAgent({
      ticker,
      settings
    })
    .then(res => store.get(res.id))
    .then(res => {
      t.not(res.id, undefined)
      t.deepEqual(res.ticker, ticker)
    })
})

test.serial('update agent', async  t => {
  const initial = await store.get('a1')

  const final = await store
    .putAgent({
      id: 'a1',
      isActive: false
    })
    .then(_ => store.get('a1'))

  t.is(initial._id, final._id)

  t.not(initial.isActive, final.isActive)
})
