const {
  prop,
  always,
  applySpec
} = require('ramda')

const type = prop('side')

const order_type = always('market')

const amount = order => {
  const { side, quantity, price } = order

  return side === 'sell'
    ? quantity
    : quantity * price
}

module.exports = applySpec({
  type,
  order_type,
  amount
})
