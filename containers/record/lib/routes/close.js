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

const combine = applySpec({
  symbol: compose(prop('symbol'), head),
  amount: compose(negate, sum, map(prop('amount')))
})


const queryOpen = assoc('dateClosed', { $exists: false })

const queryIds = compose(
  $in => ({ _id: { $in } }),
  map(prop('_id'))
)

async function close (ctx) {
  const { monk, request, state } = ctx

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

  const res = await update(
    queryIds(slots),
    {
      $set: {
        priceFinal: Number(request.body.price),
        dateClosed: new Date()
      }
    }
  )

  ctx.body = res
}

module.exports = () =>
  del('/', close)



