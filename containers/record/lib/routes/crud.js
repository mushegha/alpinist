const Router = require('koa-router')

const { identity } = require('ramda')

function list () {
  return async ctx => {
    const { monk } = ctx

    ctx.body = await monk
      .get('accords')
      .find()
  }
}

function create () {

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

  return async ctx  => {
    const { monk, request } = ctx

    const doc = prepare(request.body)

    ctx.body = await monk
      .get('accords')
      .insert(doc)
  }
}

module.exports = () => {
  const router = new Router()

  router.get('/', list())
  router.post('/', create())

  return router.routes()
}
