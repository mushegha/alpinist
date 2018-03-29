const { post } = require('koa-route')

const prepare = data => {
  const {
    symbol,
    amount,
    traderId,
    price,
  } = data

  return {
    symbol,
    amount: Number(amount),
    traderId,
    priceOpen: Number(price),
    dateCreated: new Date()
  }
}

async function open (ctx) {
  const { monk, request } = ctx

  const data = prepare(request.body)

  await monk
    .get('accords')
    .insert(data)

  ctx.status = 201
}

module.exports = () =>
  post('/', open)


