const Router = require('koa-router')

const getOne = require('./getters/redis-one')

async function get (ctx) {
  const { redis, params } = ctx

  const res = await getOne(redis, params.symbol)

  ctx.assert(res, 404)

  ctx.body = res
}

module.exports = () => {
  const router = new Router()

  router.get('/:symbol', get)

  return router.routes()
}
