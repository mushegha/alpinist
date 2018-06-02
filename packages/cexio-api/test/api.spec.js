import test from 'ava'

import Axios from 'axios'

import noncer from '../lib/noncer'

import { placeOrder } from '..'

test('nonce', t => {
  t.true(noncer() < noncer())
})

test('placeOrder', async t => {

  const opts = {
    userId: 'up111849658',
    apiKey: 'UFCPRP2OCrz29iU3j2iKZXCt3M',
    apiSecret: 'UsYdCQ8GVZpVarFAbcnPe3ytPo'
  }

  const order = {
    subject: 'sub',
    broker: 'cexio',
    symbol: 'eth-usd',
    side: 'sell',
    quantity: 0.05,
    price: 590
  }

  const x = await placeOrder(opts, order)

  console.log(x)

  t.pass()
})
