const {
  converge,
  divide,
  compose,
  assoc,
  merge,
  pick,
  reduce
} = require('ramda')

const { ulid } = require('ulid')

/**
 *
 */

const FIELDS = [
  'status',
  'market',
  'symbol',
  'type',
  'side',
  'price',
  'amount'
]

const aggregateAmount = reduce((acc, order) => {
  const { amount, side } = order

  const factor = side === 'buy' ? 1 : -1

  return acc + factor * amount
}, 0)

const aggregateCost = reduce((acc, order) => {
  const { amount, side, price } = order

  const factor = side === 'buy' ? 1 : -1

  return acc + factor * amount * price
}, 0)

/**
 * Class Transaction
 */

class Transaction {
  constructor (data) {
    return Object.assign(this, data)
  }

  get amount () {
    const get = compose(
      Math.abs,
      aggregateAmount
    )

    return get(this.members)
  }

  get side () {
    const get = compose(
      x => x > 0 ? 'buy' : 'sell',
      aggregateAmount
    )

    return get(this.members)
  }

  get price () {
    const get = converge(
      divide,
      [
        aggregateCost,
        aggregateAmount
      ]
    )

    return get(this.members)
  }
}

/**
 *
 */

function create (members) {
  const from = compose(
    assoc('_id', ulid()),
    assoc('status', 'new')
  )

  return new Transaction(from({ members }))
}

/**
 * Expose
 */

module.exports = Transaction

module.exports.create = create
