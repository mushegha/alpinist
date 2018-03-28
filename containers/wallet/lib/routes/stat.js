const Router = require('koa-router')

const { distanceInWords } = require('date-fns')


function stat () {
  return async ctx => {
    const { monk, params } = ctx

    const query = { _id: params.id }

    const doc = await monk
      .get('traders')
      .findOne(params.id)

    ctx.assert(doc, 404)

    ctx.body = {
      uptime: distanceInWords(doc.dateCreated, new Date())
    }
  }
}


module.exports = () => {
  const router = new Router()

  router.get('/:id/stat', stat())

  return router.routes()
}
