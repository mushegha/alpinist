const {
  map,
  compose
} = require('ramda')


function from (transaction) {
  const {
    subject,
    status,
    price,
    members
  } = transaction

  const prepare = order => {
    order.memberOf = subject
    order.price = price || order.price
    order.status = status

    return order
  }

  return map(prepare, members)
}

module.exports = from
