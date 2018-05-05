const { map } = require('ramda')

const { from } = require('rxjs/observable/from')
const { flatMap } = require('rxjs/operators')

const membersOf = transaction => {
  const {
    subject,
    status,
    price
  } = transaction

  const prepared = map(order => {
    order.memberOf = subject
    order.price = price || order.price
    order.status = status

    return order
  })

  return from(prepared(transaction.members))
}

module.exports = flatMap(membersOf)
