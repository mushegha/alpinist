import test from 'ava'

import {
  getAll,
  getBalanceOf
} from '../../lib/models/wallet'

test.serial('getAll', async t => {
  const assertSerialized = wallet => {
    t.not(wallet.type, undefined)
    t.not(wallet.currency, undefined)

    t.is(typeof wallet.balance, 'number')
  }

  await getAll()
    .then(wallets => wallets.forEach(assertSerialized))

  t.pass()
})

test.serial('getBalanceOf', async t => {
  const target = {
    type: 'exchange',
    currency: 'USD'
  }

  await getBalanceOf(target)
    .then(x => t.is(typeof x, 'number'))
})
