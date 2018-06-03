const debug = require('debug')('alpinist:orders:bitfinex')

const Channel = require('./lib/channel')

const Processor = require('./lib/processor/bitfinex')

const getenv = require('getenv')

const {
  tap,
  dissoc,
  propEq,
  merge
} = require('ramda')

const creds = getenv.multi({
  apiKey    : ['BITFINEX_API_KEY'],
  apiSecret : ['BITFINEX_API_SECRET'],
})

const processor = Processor(creds)

const sink = Channel.Observer()

const source = Channel
  .Observable('bitfinex')
  .filter(propEq('status', 'new'))
  .flatMap(processor)
  .map(tap(x => debug('%O', x)))
  // .map(dissoc('info'))
  .subscribe(sink)
