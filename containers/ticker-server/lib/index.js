const Koa = require('koa')

const logger = require('koa-logger')

const router = require('./router')

const redis = require('./middlewares/redis')

module.exports = () => {
  const app = new Koa()

  app.use(logger())

  app.use(redis())

  app.use(router())

  return app
}
