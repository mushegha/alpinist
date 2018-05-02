const {
  compose,
  assoc,
  merge,
  pick
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

/**
 * Class Order
 */

class Order {
  constructor (data) {
    return Object.assign(this, data)
  }
}

/**
 * Helpers
 */

/**
 * Create a new order
 */

function create (data) {
  const from = compose(
    assoc('_id', ulid()),
    assoc('status', 'new')
  )

  return new Order(from(data))
}

/**
 * Expose
 */

module.exports = Order

module.exports.create = create
