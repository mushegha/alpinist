const Router = require('koa-router')

const rt = require('rethinkdb')

module.exports = () => {
  const router = new Router()

  router.use(async (ctx, next) => {
    const options = {
      host: 'localhost',
      port: 28015
    }

    ctx.conn = await rt.connect(options)

    return next()
  })

  const insert = async ctx => {
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

    ctx.body = await rt
      .db('alpinist')
      .table('ticker')
      .insert(data)
      .run(conn)
  }

  router.post('/:pair/:provider', insert)

  return router.routes()
}
