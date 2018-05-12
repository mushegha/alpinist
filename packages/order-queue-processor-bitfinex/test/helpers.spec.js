import test from 'ava'

import H from '../lib/helpers'

test('symbol', t => {
  t.is(H.fromPlainSymbol('ethusd'), 'tETHUSD', 'convert')
  t.is(H.toPlainSymbol('tETHUSD'), 'ethusd', 'recover')
})

test('convert', t => {
  const data = {
    symbol   : 'ethusd',
    quantity : 0.2,
    price    : 500,
    side     : 'sell'
  }

  t.deepEqual(
    H.convert(data),
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
    type   : 'EXCHANGE MARKET'
  }

  t.deepEqual(
    H.recover(data),
    {
      symbol   : 'ethusd',
      price    : 500,
      quantity : 0.2,
      side     : 'sell'
    }
  )
})
