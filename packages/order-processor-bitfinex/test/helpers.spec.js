import test from 'ava'

import H from '../lib/helpers'

test('symbol', t => {
  t.is(H.fromPlainSymbol('ethusd'), 'tETHUSD', 'convert')
  t.is(H.toPlainSymbol('tETHUSD'), 'ethusd', 'recover')
})

test('convert', t => {
  const data = {
    gid      : 'gid-1'
    symbol   : 'ethusd',
    quantity : 0.2,
    price    : 500,
    side     : 'sell'
  }

  const res1 = H.convert(data)
  const res2 = H.convert(data)

  t.deepEqual(res1,
    {
      symbol : 'tETHUSD',
      amount : -0.2,
      price  : 500,
      type   : 'EXCHANGE MARKET'
    }
  )
})

test('recover', t => {
  const data = {
    symbol : 'tETHUSD',
    amount : -0.2,
    price  : 500,
    type   : 'EXCHANGE MARKET',
    status : 'ACTIVE'
  }

  t.deepEqual(
    H.recover(data),
    {
      type     : 'market',
      symbol   : 'ethusd',
      price    : 500,
      quantity : 0.2,
      side     : 'sell',
      status   : 'active'
    }
  )
})
