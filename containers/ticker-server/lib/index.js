const Koa = require('koa')

const logger = require('koa-logger')

const routes = require('./routes')

const redis = require('./middlewares/redis')

module.exports = () => {
  const app = new Koa()

  app.use(logger())

  app.use(redis())

  app.use(routes())

  return app
}
