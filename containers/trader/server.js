const debug = require('debug')('alp:trader:server')

const Koa = require('koa')

const getenv = require('getenv')

const routes = require('./lib/routes')

const middlewares = require('./lib/middlewares')

/**
 * Settings
 */

const PORT = getenv.int('NODE_PORT', 8080)

/**
 * App
 */

const app = new Koa()

app.use(middlewares())

app.use(routes())

app.listen(PORT, () => {
  debug('Listening to %d', PORT)
})
