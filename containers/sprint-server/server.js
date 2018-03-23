const debug = require('debug')('alpinist:server')

const getenv = require('getenv')

const Koa = require('koa')

const logger = require('koa-logger')

const router = require('./lib/router')

const clients = require('./lib/clients')

/**
 *
 */

const app = new Koa()

app.context.clients = clients

app.use(logger())

app.use(router())


/**
 *
 */

const port = getenv.int('NODE_PORT', 8080)

app.listen(port, () => {
  debug('Listening to port: %d', port)
})
