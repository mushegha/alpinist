const debug = require('debug')('alpinist:tickers')

const Koa = require('koa')

const logger = require('koa-logger')

const Redis = require('ioredis')

const getenv = require('getenv')

const { map } = require('ramda')

/**
 * Config
 */

const NODE_PORT = getenv('NODE_PORT', 80)
const REDIS_URL = getenv('REDIS_URL', 'redis://localhost:6379')

/**
 * Redis
 */

const redis = new Redis(REDIS_URL)

/**
 * Koa app
 */

const app = new Koa()

app
  .use(logger())
  .use(tickers())

/**
 * Middlewares
 */

function tickers () {
  const pattern = 'tickers:*'

  return async ctx => {
    if (ctx.path !== '/') return void 0

    ctx.body = await redis
      .keys(pattern)
      .then(keys => redis.mget(keys))
      .then(map(JSON.parse))
  }
}

/**
 * Start
 */

app.listen(NODE_PORT, _ => {
  debug('Server listening to port %d', NODE_PORT)
})
