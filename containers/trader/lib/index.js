const Koa = require('koa')

const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')

const routes = require('./routes')

const monk = require('./middlewares/monk')

module.exports = () => {
  const app = new Koa()

  app.use(logger())
  app.use(bodyparser())

  app.use(monk())

  app.use(routes())

  return app
}
