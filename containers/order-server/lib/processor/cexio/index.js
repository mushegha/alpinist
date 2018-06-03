const { Observable } = require('rxjs/Rx')

const {
  flip,
  merge
} = require('ramda')

const mergeFlipped = flip(merge)

const submitOrder = require('./submit-order')

function Processor (creds) {
  return order =>
    Observable
      .of(order)
      .flatMap(submitOrder(creds))
      .map(merge(order))
}

module.exports = Processor
