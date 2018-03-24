const Router = require('koa-router')

const wallet = require('./wallet')
const ticker = require('./ticker')

function bootstrap () {
  const router = new Router()

  router.get('/wallet', wallet())
  router.get('/ticker', ticker())

  return router.routes()
}

module.exports = bootstrap
