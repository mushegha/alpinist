const Router = require('koa-router')

const logger = require('koa-logger')


function bootstrap () {
  const router = new Router()

  return router.routes()
}

module.exports = bootstrap
