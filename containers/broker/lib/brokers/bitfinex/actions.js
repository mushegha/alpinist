const debug = require('debug')('alp:broker:bitfinex')

const { Order } = require('bitfinex-api-node/lib/models')

const {
  curryN,
  assoc,
  compose
} = require('ramda')

const {
  convert,
  recover
} = require('./helpers')

const construct = data =>
  new Order(data)

const assocCid = data =>
  assoc('cid', Date.now(), data)

const fromPlain = compose(
  construct,
  assocCid,
  convert
)

function submit (ws, data) {
  const order = fromPlain(data)

  const submit = (resolve, reject) => {
    order.registerListeners(ws)

    order.on('close', () => {
      debug('Order closed: %s', order.status)
      resolve(recover(order))
    })

    order.submit(ws)
  }

  debug('Submitting order %s', order.cid)

  return new Promise(submit)
}

module.exports.submit = curryN(2, submit)
