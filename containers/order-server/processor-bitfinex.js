const debug = require('debug')('alpinist:orders:bitfinex')

const Channel = require('./lib/channel')

const Processor = require('./lib/processor/bitfinex')

const getenv = require('getenv')

const {
  propEq,
  tap,
  dissoc,
  merge
} = require('ramda')

/**
 * Config
 */

const creds = getenv.multi({
  apiKey    : ['BITFINEX_API_KEY'],
  apiSecret : ['BITFINEX_API_SECRET'],
})

/**
 * Helpers
 */

const isNew = propEq('status', 'new')

/**
 *
 */

const processor = Processor(creds)

const sink = Channel.Observer()

const source = Channel
  .Observable('bitfinex')
  .filter(isNew)
  .flatMap(processor)
  .map(tap(x => debug('%O', x)))
  // .map(dissoc('info'))
  .subscribe(sink)
