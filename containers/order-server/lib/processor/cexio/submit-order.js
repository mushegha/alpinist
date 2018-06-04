const debug = require('debug')('alpinist:orders:cexio')

const {
  merge,
  compose,
  assoc,
  curry
} = require('ramda')

const Request = require('./request')

const fromOrder = require('./from-order')

const submitOrder = (creds, order) => {
  const request = Request(creds)

  const [ S1, S2 ] = order.symbol
    .toUpperCase()
    .split('-')

  const uri = `/place_order/${S1}/${S2}`
  const params = fromOrder(order)

  const resolve = res => {
    const { id, message } = res

    return request('/get_order/', { id })
      .then(result => {
        const quantity = result[`a:${S1}:cds`]
        const worth = result[`a:${S2}:cds`]

        return {
          status: 'closed',
          quantity: Number(quantity),
          price: order.price,
          info: message
        }
      })
  }

  return request(uri, params)
    .then(result => {
      if (result.error) {
        debug('Rejected with error %s', result.error)

        return {
          status: 'rejected',
          info: result.error
        }
      }

      return resolve(result)
    })
    .then(assoc('ts', Date.now()))
}


module.exports = curry(submitOrder)
