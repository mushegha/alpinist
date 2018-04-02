const debug = require('debug')('alp:records')

const { put } = require('koa-route')

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
  amount: compose(negate, sum, map(prop('amount'))),
})


const useOrder = applySpec({
  id        : prop('id'),
  price     : prop('price'),
  amount    : prop('amountOrig'),
  mtsCreate : prop('mtsCreate'),
  mtsUpdate : prop('mtsUpdate')
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

  const { tickerClose } = request.body

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
    const orderClose = await submit(ws, orderData).then(useOrder)

    debug('Closing %d with at price %d', slots.length, orderClose.price)

    const res = await update(
      queryIds(slots),
      {
        $set: {
          tickerClose,
          orderClose,
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
  put('/', close)



