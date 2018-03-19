const Koa = require('koa')

const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')

const rethinkdb = require('./koa-rethinkdb')

const router = require('./router')

module.exports = () => {
  const app = new Koa()

  app.use(logger())
  app.use(bodyparser())

  app.use(rethinkdb())

  app.use(router())

  return app
}
