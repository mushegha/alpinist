const debug = require('debug')('alpinist:orders:cexio')

const {
  tap,
  dissoc,
  propEq,
  complement
} = require('ramda')

const Channel = require('./lib/channel')

const Store = require('./lib/store')

/**
 * Helpers
 */

const isNew = propEq('status', 'new')

const isProcessed = complement(isNew)

/**
 *
 */

const source = Channel.Observable()

const sink = Channel.Observer()

const store = new Store()

/**
 *
 */

source
  .filter(isProcessed)
  .subscribe(order => {
    debug('Status update for %s', order.id)

    store
      .putOrder(order)
      .then(_ => debug('Updated %s to %s', order.id, order.status))
  })

/**
 *
 */

store
  .source()
  .filter(isNew)
  .map(tap(x => debug('Received %s', x.id)))
  .subscribe(sink)
