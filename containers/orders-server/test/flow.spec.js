import test from 'ava'

// import Rx from 'rxjs/Rx'
import { Observable } from 'rxjs/Rx'
import { from } from 'rxjs/observable/from'
import {
  flatMap,
  concatMap
} from 'rxjs/operators'

import R from 'ramda'
import RA from 'ramda-adjunct'

import Orders from '../lib/orders'
import Transactions from '../lib/transactions'

const sourceData = require('./assets/stream.transactions.json')

test(async t => {
  const source = Observable
    .interval(1000)
    .take(sourceData.length)
    .map(i => sourceData[i])

  const flow = source
    // .concatMap(Transactions.putCouchDB)
    .pipe(
      concatMap(Transactions.putCouchDB),
      flatMap(Orders.fromTransaction)
    )

    // .flatMap(Transactions.putCouchDB)

  const subscribe = flow.subscribe(val => console.log(val));

  await new Promise(r => setTimeout(r, 10000))

  t.pass()
})
