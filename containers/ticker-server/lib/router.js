const Router = require('koa-router')

const {
  head,
  assoc
} = require('ramda')

const {
  insert,
  select
} = require('./api/rethinkdb')

async function put (ctx) {
  const { conn, params, request } = ctx

  const data = request.body

  data.moment = new Date()

  await insert(data, conn)

  ctx.status = 200
}

async function get (ctx) {
  const { conn, query } = ctx
  ctx.body = await select(query, conn)
}

async function getOne (ctx) {
  const { conn, query } = ctx

  const lastOf = assoc('limit', 1)

  ctx.body = await select(lastOf(query), conn)
    .then(head)
}

module.exports = () => {
  const router = new Router()

  router.put('/', put)
  router.get('/', get)
  router.get('/_', getOne)

  return router.routes()
}
