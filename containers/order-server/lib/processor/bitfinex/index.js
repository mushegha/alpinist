const { Observable } = require('rxjs/Rx')

const { Order } = require('bitfinex-api-node/lib/models')

const { merge } = require('ramda')

const Pool = require('./pool')

const { fromOrder } = require('./observable')

const {
  convert,
  recover
} = require('./helpers')

function Connect (opts = {}) {
  const pool = new Pool(opts)

  const toOrder = params => {
    const initP = pool
      .acquire()
      .then(ws => new Order(params, ws))

    return Observable.fromPromise(initP)
  }

  return order =>
    Observable
      .of(order)
      .map(convert)
      .flatMap(toOrder)
      .flatMap(fromOrder)
      .map(recover)
      .map(merge(order))
}

module.exports = Connect
