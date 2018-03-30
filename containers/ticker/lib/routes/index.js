const Router = require('koa-router')

const { map } = require('ramda')

const getenv = require('getenv')

const getOne = require('../getters/redis-one')

const symbols = getenv.array('TICKER_SYMBOLS', 'string', [])

async function list (ctx) {
  const { redis } = ctx

  ctx.body = await Promise.all(
    map(getOne(redis), symbols)
  )
}

async function read (ctx) {
  const { redis, params } = ctx

  const res = await getOne(redis, params.symbol)

  ctx.assert(res, 404)

  ctx.body = res
}

module.exports = () => {
  const router = new Router()

  router.get('/', list)
  router.get('/:symbol', read)

  return router.routes()
}
