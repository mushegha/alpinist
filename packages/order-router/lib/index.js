const Koa = require('koa')

const bodyparser = require('koa-bodyparser')

const Store = require('./store')

const Router = require('./router')

module.exports = function (opts) {
  const app = new Koa()

  const router = Router()

  app.use(bodyparser())

  app.use(Store())
  app.use(Router())

  return app
}
