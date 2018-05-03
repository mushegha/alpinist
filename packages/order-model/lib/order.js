const {
  reduce,
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
 * Helpers
 */

const aggregate = members => {
  const init = {
    cost: 0,
    amount: 0
  }

  const toTotal = (acc, order) => {
    const {
      amount,
      price,
      side
    } = order

    const k = side === 'buy' ? 1 : -1

    return {
      cost: acc.cost + amount * price * k,
      amount: acc.amount + amount * k
    }
  }

  const { cost, amount } = reduce(toTotal, init, members)

  return {
    amount: Math.abs(amount),
    price: cost / amount,
    side: amount > 0 ? 'buy' : 'sell'
  }
}

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

  toJSON () {
    const acc = aggregate(this.members)

    const side   = this.side || acc.side
    const price  = this.price || acc.price
    const amount = this.amount || acc.amount

    return merge(this, { side, price, amount })
  }

}

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
