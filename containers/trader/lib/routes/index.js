const Router = require('koa-router')

const crud = require('./crud')
const stat = require('./stat')

module.exports = () => {
  const router = new Router()

  router
    .use(crud())
    .use(stat())

  return router.routes()
}
