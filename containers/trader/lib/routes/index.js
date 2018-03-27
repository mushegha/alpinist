const Router = require('koa-router')

async function get (ctx) {
  ctx.body = 'exo'
}

module.exports = () => {
  const router = new Router()

  router.get('/', get)

  return router.routes()
}
