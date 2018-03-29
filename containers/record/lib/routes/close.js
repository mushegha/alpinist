const { del } = require('koa-route')

const {
  compose,
  prop,
  head,
  negate,
  sum,
  map,
  applySpec
} = require('ramda')

const combine = applySpec({
  symbol: compose(prop('symbol'), head),
  amount: compose(negate, sum, map(prop('amount')))
})

async function close (ctx) {
  const { monk, request, state } = ctx

  const { query, options } = state

  const { find, update } = monk.get('records')

  const slots = await find(query, options)

  const orderData = combine(slots)

  const res = await update(
    { _id: { $in: map(prop('_id'), slots) } },
    {
      $set: {
        priceFinal: 8000,
        dateClosed: new Date()
      }
    }
  )

  ctx.body = res
}

module.exports = () =>
  del('/', close)



