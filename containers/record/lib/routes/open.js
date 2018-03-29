const debug = require('debug')('alp:records')

const { post } = require('koa-route')

const { submit } = require('./actions/order')

const prepare = data => {
  const {
    symbol,
    amount,
    trader,
  } = data

  return {
    trader,
    symbol,
    amount     : Number(amount),
    dateOpened : new Date()
  }
}

async function open (ctx) {
  const { monk, request } = ctx

  const { ws } = ctx.bitfinex

  const data = prepare(request.body)

  debug('Submitting %O', data)

  try {
    const real = await submit(ws, data)

    data.priceInitial = real.price

    await monk
      .get('records')
      .insert(data)

    ctx.status = 201
  } catch (err) {
    debug('Failed with %s', err.message)

    ctx.status = 500
  }
}

module.exports = () =>
  post('/', open)

