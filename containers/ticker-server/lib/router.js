const Router = require('koa-router')

const rt = require('rethinkdb')

const { head } = require('ramda')

async function put (ctx) {
  const { conn, params, request } = ctx

  const { pair, provider } = params
  const { bid, ask } = request.body

  const data = {
    pair,
    provider,
    bid,
    ask,
    timestamp: rt.now()
  }

  await rt
    .db('alpinist')
    .table('ticker')
    .insert(data)
    .run(conn)

  ctx.status = 200
}

async function get (ctx) {
  const { conn, params } = ctx

  const data = await rt
    .db('alpinist')
    .table('ticker')
    .orderBy({ index: rt.desc('timestamp') })
    .filter(params)
    .limit(1)
    .run(conn)
    .then(cursor => cursor.toArray())
    .then(head)

  if (data) {
    ctx.status = 200
    ctx.body = data
  } else {
    ctx.status = 404
  }
}

module.exports = () => {
  const router = new Router()

  router.put('/:provider/:pair', put)
  router.get('/:provider/:pair', get)

  return router.routes()
}
