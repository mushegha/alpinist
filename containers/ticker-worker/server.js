const debug = require('debug')('queue')

const fromBitfinex = require('./lib/from-bitfinex')

const { update } = require('./lib/api')

fromBitfinex(['btcusd', 'neousd'])
  .subscribe(update)
