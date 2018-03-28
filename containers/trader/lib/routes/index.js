const Router = require('koa-router')

const crud = require('./crud')

module.exports = () => {
  const router = new Router()

  router.use(crud())

  return router.routes()
}
