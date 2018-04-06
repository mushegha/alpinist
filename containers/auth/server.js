const debug = require('debug')('alp:auth')

const Koa = require('koa')

const getenv = require('getenv')

const middlewares = require('./lib/middlewares')

const routes = require('./lib/routes')

/**
 * Settings
 */

const PORT = getenv.int('NODE_PORT', 8080)

/**
 * App
 */

const app = new Koa()

app
  .use(middlewares())
  .use(routes())

app.listen(PORT, () => {
  debug('Listening to %d', PORT)
})
