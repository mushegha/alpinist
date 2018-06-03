import test from 'ava'

import { Observable } from 'rxjs/Rx'

import delay from 'delay'

import { tap } from 'ramda'

import * as Channel from '../lib/channel'

test('bitfinex', async t => {

  const will = {
    id: 'bitfinex-1',
    ts: Date.now(),
    subject: 'subject-1',
    broker: 'bitfinex',
    symbol: 'eth-usd',
    side: 'buy',
    price: 620,
    quantity: 0.05,
    status: 'new'
  }

  const sink = Channel.Observer()

  const source = Channel.Observable()

  await delay(1500)

  source.subscribe(console.log)

  Observable
    .of(will)
    .map(tap(console.log))
    .subscribe(sink)

  await delay(1500)

  t.pass()
})

test('cexio', async t => {

  const will = {
    id: 'cexio-1',
    ts: Date.now(),
    subject: 'subject-1',
    broker: 'cexio',
    symbol: 'eth-usd',
    side: 'sell',
    price: 620,
    quantity: 0.05,
    status: 'new'
  }

  const sink = Channel.Observer()

  const source = Channel.Observable()

  await delay(1500)

  source.subscribe(console.log)

  Observable
    .of(will)
    .subscribe(sink)

  await delay(1500)

  t.pass()
})
