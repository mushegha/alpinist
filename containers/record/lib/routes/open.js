const debug = require('debug')('alp:record')

const { post } = require('koa-route')

const {
  tap,
  compose,
  pick,
  prop,
  applySpec
} = require('ramda')

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
  const { monk, bull, request } = ctx

  const data = prepare(request.body)

  debug('Submitting %O', data)

  try {
    const job = await bull.add(data)

    const res =  await job
      .finished()
      .then(tap(console.log))
      .then(useOrder)

    data.orderOpen = res

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
