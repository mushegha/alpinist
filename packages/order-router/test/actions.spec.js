import test from 'ava'

import {
  create,
  read,
  findAll
} from '../lib/actions'

import Store from '@alpinist/order-store/lib/store'

test.beforeEach(async t => {
  await new Store().destroy()

  const store = new Store()

  await store
    .put({ _id: 'x1', status: 'new' })

  // await store
  //   .put({ _id: 'x2', status: 'new' })

  await store
    .put({ _id: 'x2', status: 'completed' })

  t.context = { store }
})

test.serial('create', async t => {
  const { context } = t

  context.request = {
    body: {
      quantity: 100
    }
  }

  await create(context)
    .then(_ => {
      const { status, body } = context

      t.is(status, 201)

      t.not(body.id, undefined)
    })

  t.pass()
})

test.serial('read', async t => {
  const { context } = t

  context.params = {
    id: 'x1'
  }

  await read(context)
    .then(_ => {
      const { body } = context

      t.is(body.id, 'x1')
      t.is(body.status, 'new')
    })
})

test.serial('read', async t => {
  const { context } = t

  context.request = {
    query: {
      status: 'new'
    }
  }

  await findAll(context)
    .then(_ => {
      const { body } = context

      t.is(body.query.status, 'new')
      t.is(body.members.length, 1)
    })
})
