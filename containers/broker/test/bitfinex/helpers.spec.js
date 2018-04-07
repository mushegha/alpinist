import test from 'ava'

import H from '../../lib/brokers/bitfinex/helpers'

test('symbol', t => {
  t.is(H.fromPlainSymbol('btcusd'), 'tBTCUSD', 'convert')
  t.is(H.toPlainSymbol('tBTCUSD'), 'btcusd', 'recover')
})
