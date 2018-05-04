import test from 'ava'

import PouchDB from 'pouchdb'

import { omit, mergeAll } from 'ramda'

import { reduceP } from 'ramda-adjunct'

import through from '../lib/transactions/through-couchdb'

const TRANSACTION_LIFECYCLE = [
  {
    "subject" : "s1",
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
  }, {
    "subject" : "s1",
    "status"  : "open"
  }, {
    "subject" : "s1",
    "status"  : "closed",
    "amount"  : 0.4,
    "price"   : 505
  }
]


test('init', async t => {
  const resultP = reduceP(
    (acc, order) => through(order),
    null,
    TRANSACTION_LIFECYCLE
  )

  const result = await resultP.then(omit(['_id', '_rev']))

  t.deepEqual(result, mergeAll(TRANSACTION_LIFECYCLE))

  t.pass()
})
