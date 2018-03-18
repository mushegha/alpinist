const Koa = require('koa')

const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')

const router = require('./router')
//
// const elasticsearch = require('./koa-elasticsearch')
// const redis = require('./koa-redis')

module.exports = opts => {
  const app = new Koa()

  app.use(logger())
  app.use(bodyparser())

  app.use(router())

  return app
}
