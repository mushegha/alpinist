const Koa = require('koa')

const bodyparser = require('koa-bodyparser')

const Router = require('./router')

module.exports = function (opts) {
  const app = new Koa()

  const router = Router()

  app.use(bodyparser())

  app.use(Router())

  return app
}
