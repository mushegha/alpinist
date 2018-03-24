const Router = require('koa-router')

const wallet = require('./wallet')
const ticker = require('./ticker')
const ladder = require('./ladder')

function bootstrap () {
  const router = new Router()

  router.get('/wallet', wallet())
  router.get('/ticker', ticker())
  router.get('/ladder', ladder())

  return router.routes()
}

module.exports = bootstrap
