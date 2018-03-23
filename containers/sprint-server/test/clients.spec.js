import test from 'ava'

import clients from '../lib/clients'


test('redis', async t => {
  const { redis } = clients

  await redis
    .ping()
    .then(res => t.is(res, 'PONG'))
})

test('mongo', async t => {
  const { mongo } = clients

  await mongo
    .get('ticker')
    .stats()
    .then(res => t.is(res.ok, 1))
})

test('bitfinex', async t => {
  const { bitfinex } = clients

  const rest = bitfinex.rest(2)

  await rest
    .wallets((err, data) => {
      return err
        ? t.fail()
        : data
    })
    .then(() => t.pass())
})
