import test from 'ava'

import PouchDB from 'pouchdb'

import { omit, mergeAll } from 'ramda'

import { reduceP } from 'ramda-adjunct'

import Orders from '../lib/orders'

const NEW_TRANSACTION = {
  "subject" : "s2",
  "status"  : "new",
  "type"    : "market",
  "symbol"  : "ethusd",
  "market"  : "bitfinex",
  "members" : [
    {
      "subject" : "xa",
      "agent"   : "a1",
      "side"    : "buy",
      "amount"  : 0.2,
      "price"   : 500
    }, {
      "subject" : "xb",
      "agent"   : "a1",
      "side"    : "buy",
      "amount"  : 0.2,
      "price"   : 500
    }
  ]
}

test('from transaction', async t => {
  const ordersNew = Orders.fromTransaction(NEW_TRANSACTION)

  console.log(ordersNew)

  t.pass()
})
