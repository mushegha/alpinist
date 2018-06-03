import test from 'ava'

import { Observable } from 'rxjs/Rx'

import delay from 'delay'

import * as Channel from '../lib/channel'

test.skip('bitfinex', async t => {

  const will = {
    id: 'bitfinex-1',
    ts: Date.now(),
    subject: 'subject-1',
    broker: 'bitfinex',
    symbol: 'eth-usd',
    status: 'new',
    side: 'buy',
    price: 620,
    quantity: 0.05
  }

  const sink = Channel.Observer()

  const source = Channel.Observable()

  source.subscribe(console.log)

  Observable
    .of(will)
    .subscribe(sink)

  await delay(4000)

  t.pass()
})

test('cexio', async t => {

  const will = {
    id: 'cexio-1',
    ts: Date.now(),
    subject: 'subject-1',
    broker: 'cexio',
    symbol: 'eth-usd',
    status: 'new',
    side: 'sell',
    price: 620,
    quantity: 0.05
  }

  const sink = Channel.Observer()

  const source = Channel.Observable()

  source.subscribe(console.log)

  Observable
    .of(will)
    .subscribe(sink)

  await delay(4000)

  t.pass()
})
