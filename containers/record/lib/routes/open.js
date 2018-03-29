const { post } = require('koa-route')

const prepare = data => {
  const {
    symbol,
    amount,
    trader,
    price,
  } = data

  return {
    trader,
    symbol,
    amount       : Number(amount),
    priceInitial : Number(price),
    dateCreated  : new Date()
  }
}

async function open (ctx) {
  const { monk, request } = ctx

  const data = prepare(request.body)

  await monk
    .get('records')
    .insert(data)

  ctx.status = 201
}

module.exports = () =>
  post('/', open)


