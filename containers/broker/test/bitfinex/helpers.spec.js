import test from 'ava'

import H from '../../lib/brokers/bitfinex/helpers'

test('symbol', t => {
  t.is(H.fromPlainSymbol('btcusd'), 'tBTCUSD', 'convert')
  t.is(H.toPlainSymbol('tBTCUSD'), 'btcusd', 'recover')
})

test('convert', t => {
  const data = {
    symbol: 'btcusd',
    amount: 0.2,
    side  : 'SELL'
  }

  t.deepEqual(
    H.convert(data),
    {
      symbol: 'tBTCUSD',
      amount: -0.2,
      type  : 'EXCHANGE MARKET'
    }
  )
})

test('recover', t => {
  const data = {
    symbol: 'tBTCUSD',
    amount: -0.2,
    type  : 'EXCHANGE MARKET'
  }

  t.deepEqual(
    H.recover(data),
    {
      symbol: 'btcusd',
      amount: 0.2,
      side  : 'SELL'
    }
  )
})
