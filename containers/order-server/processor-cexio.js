const debug = require('debug')('alpinist:orders:cexio')

const Channel = require('./lib/channel')

const Processor = require('./lib/processor/cexio')

const getenv = require('getenv')

const {
  tap,
  dissoc,
  propEq
} = require('ramda')

const creds = getenv.multi({
  userId    : ['CEXIO_USER_ID'],
  apiKey    : ['CEXIO_API_KEY'],
  apiSecret : ['CEXIO_API_SECRET'],
})

const processor = Processor(creds)

const sink = Channel.Observer()

const source = Channel.Observable('cexio')
  .filter(propEq('status', 'new'))
  .flatMap(processor)
  .map(tap(x => debug(x.info)))
  .map(dissoc('info'))
  .subscribe(sink)
