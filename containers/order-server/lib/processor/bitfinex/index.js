const debug = require('debug')('alpinist:orders:bitfinex')

const { Observable } = require('rxjs/Rx')

const { Order } = require('bitfinex-api-node/lib/models')

const {
  merge,
  tap
} = require('ramda')

const Client = require('./client')

const { fromOrder } = require('./observable')

const {
  convert,
  recover
} = require('./helpers')

/**
 *
 */

/**
 *
 */

function Connect (creds = {}) {
  const { create, destroy } = new Client(creds)

  let clientP = create()

  const toOrder = params => {
    const submitP = clientP
      .then(ws => new Order(params, ws))

    return Observable
      .fromPromise(submitP)
  }

  return order =>
    Observable
      .of(order)
      .map(convert)
      .map(tap(o => debug('Received order: %O', o)))
      .flatMap(toOrder)
      .flatMap(fromOrder)
      .map(recover)
      .map(tap(o => debug('Processed order: %O', o)))
      .map(merge(order))
}

module.exports = Connect
