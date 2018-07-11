const debug = require('debug')('alpinist:orders:bitfinex2')

const Channel = require('./lib/channel')

const Processor = require('./lib/processor/bitfinex2')

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
  apiKey    : ['BITFINEX2_API_KEY'],
  apiSecret : ['BITFINEX2_API_SECRET'],
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
  .Observable('bitfinex2')
  .filter(isNew)
  .flatMap(processor)
  .map(tap(x => debug('%O', x)))
  // .map(dissoc('info'))
  .subscribe(sink)
