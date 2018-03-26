const Router = require('koa-router')

const {
  evolve,
  isEmpty
} = require('ramda')

async function get (ctx) {
  const { redis, params } = ctx

  const format = evolve({
    bid: Number,
    ask: Number
  })

  const key = `ticker:${params.symbol}`

  const res = await redis
    .hgetall(key)
    .then(format)

  if (isEmpty(res)) {
    return ctx.throw(404)
  }

  ctx.body = res
}

module.exports = () => {
  const router = new Router()

  router.get('/:symbol', get)

  return router.routes()
}
