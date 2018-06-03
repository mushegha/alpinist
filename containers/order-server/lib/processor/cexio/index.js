const { Observable } = require('rxjs/Rx')

const {
  merge
} = require('ramda')

const submitOrder = require('./submit-order')

function Processor (creds) {
  return order =>
    Observable
      .of(order)
      .flatMap(submitOrder(creds))
      .map(merge(order))
}

module.exports = Processor
