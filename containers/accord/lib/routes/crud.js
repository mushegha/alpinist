const Router = require('koa-router')

function list () {
  return async ctx => {
    const { monk }  = ctx

    ctx.body = await monk
      .get('accords')
      .find()
  }
}

module.exports = () => {
  const router = new Router()

  router.get('/', list())

  return router.routes()
}
