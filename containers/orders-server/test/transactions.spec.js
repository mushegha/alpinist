import test from 'ava'

import PouchDB from 'pouchdb'

import { omit, mergeAll } from 'ramda'

import { reduceP } from 'ramda-adjunct'

import Transactions from '../lib/transactions'

const TRANSACTION_LIFECYCLE = [
  {
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
  }, {
    "subject" : "s2",
    "status"  : "open"
  }, {
    "subject" : "s2",
    "status"  : "closed",
    "amount"  : 0.4,
    "price"   : 505,
  }
]


test('put CouchDB', async t => {
  const update = (acc, t) =>
    Transactions.putCouchDB(t)

  const resultP = reduceP(
    update,
    null,
    TRANSACTION_LIFECYCLE
  )

  const result = await resultP.then(omit(['_id', '_rev']))

  t.deepEqual(result, mergeAll(TRANSACTION_LIFECYCLE))

  t.pass()
})
