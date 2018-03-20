const Router = require('koa-router')

const rt = require('rethinkdb')

/**
 * Table refs
 */

const Ladder = rt
  .db('alpinist')
  .table('ladder')


async function get (ctx) {
  const { conn, params } = ctx

  const data = await Ladder
    .filter(rt.row.hasFields('priceClose').not())
    .filter(params)
    .orderBy('openPrice')
    .run(conn)
    .then(cursor => cursor.toArray())

  ctx.body = data
}


module.exports = () => {
  const router = new Router()

  router.get('/:provider/:pair', get)

  return router.routes()
}
