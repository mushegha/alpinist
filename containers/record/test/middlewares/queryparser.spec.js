import test from 'ava'

import queryparser from '../../lib/middlewares/queryparser'

/**
 * Helpers
 */

const next = () => Promise.resolve()

const fn = queryparser()


test('?trader=xxx', async t => {
  const state = {}
  const query = {
    trader: 'xxx'
  }

  await fn({ state, query }, next)

  t.deepEqual(
    state.query,
    { trader: 'xxx' }
  )
})

test('?status=open', async t => {
  const state = {}
  const query = {
    status: 'open'
  }

  await fn({ state, query }, next)

  t.deepEqual(
    state.query,
    { dateClosed: { $exists: false } }
  )
})

test('?status=closed', async t => {
  const state = {}
  const query = {
    status: 'closed'
  }

  await fn({ state, query }, next)

  t.deepEqual(
    state.query,
    { dateClosed: { $exists: true } }
  )
})

test('?sort=priceInitial', async t => {
  const state = {}
  const query = {
    sort: 'priceInitial'
  }

  await fn({ state, query }, next)

  t.deepEqual(
    state.options,
    { sort: { priceInitial: 1 } }
  )
})

test('?sort=-dateOpened', async t => {
  const state = {}
  const query = {
    sort: '-dateOpened'
  }

  await fn({ state, query }, next)

  t.deepEqual(
    state.options,
    { sort: { dateOpened: -1 } }
  )
})

test('?limit=4', async t => {
  const state = {}
  const query = {
    limit: '4'
  }

  await fn({ state, query }, next)

  t.deepEqual(
    state.options,
    { limit: 4 }
  )
})

test('?', async t => {

  const state = {}
  const query = {}

  await fn({ state, query }, next)

  t.deepEqual(state.query, {})
  t.deepEqual(state.options, {})
})
