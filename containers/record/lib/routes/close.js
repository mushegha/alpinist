const debug = require('debug')('alp:records')

const { del } = require('koa-route')

const {
  compose,
  prop,
  head,
  negate,
  sum,
  map,
  applySpec,
  assoc
} = require('ramda')

const { submit } = require('./actions/order')

/**
 * Helpers
 */

const combine = applySpec({
  symbol: compose(prop('symbol'), head),
  amount: compose(negate, sum, map(prop('amount')))
})


const queryOpen = assoc('dateClosed', { $exists: false })

const queryIds = compose(
  $in => ({ _id: { $in } }),
  map(prop('_id'))
)

/**
 *
 */

async function close (ctx) {
  const { monk, request, state } = ctx

  const { ws } = ctx.bitfinex

  const { find, update } = monk.get('records')

  const slots = await find(
    queryOpen(state.query),
    state.options
  )

  if (slots.length === 0) {
    ctx.status = 204
    return void 0
  }

  const orderData = combine(slots)

  debug('Submitting %O', orderData)

  try {
    const real = await submit(ws, orderData)

    debug('Closing %d with at price %d', slots.length, real.price)

    const res = await update(
      queryIds(slots),
      {
        $set: {
          priceFinal: real.price,
          dateClosed: new Date()
        }
      },
      { multi: true }
    )

    ctx.status = 204
  } catch (err) {
    debug('Failed with %s', err.message)

    ctx.status = 500
  }

}

module.exports = () =>
  del('/', close)



