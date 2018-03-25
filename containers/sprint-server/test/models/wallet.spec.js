import test from 'ava'

import {
  getAll,
  aggregate
} from '../../lib/models/bitfinex-wallet'

test.serial('getAll', async t => {
  const each = fn => arr =>
    arr.forEach(fn)

  const assertSerialized = wallet => {
    t.not(wallet.type, undefined)
    t.not(wallet.currency, undefined)

    t.is(typeof wallet.balance, 'number')
  }

  await getAll()
    .then(each(assertSerialized))
})

test.serial('aggregate', async t => {
  const assertSerialized = wallet => {
    t.is(typeof wallet.usd, 'number')
  }

  await aggregate()
    .then(assertSerialized)
})
