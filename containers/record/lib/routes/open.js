const debug = require('debug')('alp:records')

const { post } = require('koa-route')

const {
  compose,
  pick,
  prop,
  applySpec
} = require('ramda')

const { submit } = require('./actions/order')

const prepare = data => {
  const {
    symbol,
    amount,
    trader,
    tickerOpen
  } = data

  return {
    trader,
    symbol,
    tickerOpen,
    amount     : Number(amount),
    dateOpened : new Date()
  }
}

const useOrder = applySpec({
  id        : prop('id'),
  price     : prop('price'),
  amount    : prop('amountOrig'),
  mtsCreate : prop('mtsCreate'),
  mtsUpdate : prop('mtsUpdate'),
})


async function open (ctx) {
  const { monk, request } = ctx

  const { ws } = ctx.bitfinex

  const data = prepare(request.body)

  debug('Submitting %O', data)

  try {
    data.orderOpen = await submit(ws, data).then(useOrder)

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

