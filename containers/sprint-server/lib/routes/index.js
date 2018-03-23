const Router = require('koa-router')

const wallet = require('./wallet')

function bootstrap () {
  const router = new Router()

  router.get('/wallet', wallet())

  return router.routes()
}

module.exports = bootstrap
