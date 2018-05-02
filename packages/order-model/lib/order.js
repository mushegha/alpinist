const {
  compose,
  assoc,
  merge,
  pick,
  curryN
} = require('ramda')

const { ulid } = require('ulid')

/**
 *
 */

const EVENT_FIELDS = [
  'subject',
  'agent',
  'time'
]

const ORDER_FIELDS = [
  'market',
  'symbol',
  'type',
  'side',
  'amount',
  'price',
  'status'
]

/**
 * Class Order
 */

class AggregateOrder {
  constructor (ctx, members = []) {
    const env = {
      subject : ctx.subject || ulid(),
      agent   : ctx.agent || void 0,
      time    : ctx.time || Date.now(),
    }

    const data = {
      market : ctx.market,
      symbol : ctx.symbol,
      type   : ctx.type,
      side   : ctx.side,
      amount : ctx.amount,
      price  : ctx.price,
      status : ctx.status || 'new'
    }

    this.members = members.map(m => {
      return {
        subject : m.subject || ulid(),
        amount  : m.amount,
        price   : m.price,
        side    : m.side
      }
    })

    return Object.assign(this, env, data)
  }
}

/**
 * Helpers
 */

/**
 * Create a new order
 */

function create (context, members) {
  return new AggregateOrder(context, members)
}

/**
 * Expose
 */

module.exports = AggregateOrder

module.exports.create = curryN(2, create)
