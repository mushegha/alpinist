const Router = require('koa-router')

const {
  head,
  assoc
} = require('ramda')

async function get (ctx) {
  const { conn, query } = ctx
  ctx.body = 'exo'
}

module.exports = () => {
  const router = new Router()

  router.get('/', get)

  return router.routes()
}
