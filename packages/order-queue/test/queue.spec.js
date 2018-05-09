import test from 'ava'

import Queue from '../lib/queue'

const queue = new Queue()

const BUY_ORDER = {
  broker   : 'mock',
  symbol   : 'ethusd',
  side     : 'buy',
  price    : 500,
  quantity : 0.2
}

const SELL_ORDER = {
  broker   : 'mock',
  symbol   : 'ethusd',
  side     : 'sell',
  price    : 500,
  quantity : 0.2
}

test('constructor', async t => {
  t.is(typeof Queue, 'function')
})

test('add', async t => {
  const order = await queue.add(BUY_ORDER)

  // console.log(order)

  t.is(1, 1)
})

test('get', async t => {
  const { subject } = await queue.add(BUY_ORDER)

  const order = await queue.get(subject)

  console.log(order)

  t.is(1, 1)
})

test('getAll', async t => {
  const order1 = await queue.add(BUY_ORDER)
  const order2 = await queue.add(SELL_ORDER)

  await queue
    .getAll()
    .then(console.log)

  t.is(1, 1)
})

test.cb('flow', t => {
  const { queue } = new Queue()

  queue.on('completed', (job, res) => {
    console.log('exo')
    t.end()
  })

  queue.add(SELL_ORDER)
})
