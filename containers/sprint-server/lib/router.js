const Router = require('koa-router')

function bootstrap () {
  const router = new Router()

  return router.routes()
}

module.exports = bootstrap
