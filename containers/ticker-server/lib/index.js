const Koa = require('koa')

const logger = require('koa-logger')

const router = require('./router')

module.exports = () => {
  const app = new Koa()

  app.use(logger())

  app.use(router())

  return app
}
