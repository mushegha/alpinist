const Router = require('koa-router')

async function list (ctx) {
  const { monk } = ctx

  ctx.body = await monk
    .get('traders')
    .find()
}

async function create (ctx) {
  const { monk, request } = ctx

  ctx.body = await monk
    .get('traders')
    .insert(request.body)
}

async function read (ctx) {
  const { monk, params } = ctx

  ctx.body = await monk
    .get('traders')
    .findOne({ _id: params.id })
}

async function update (ctx) {
  const { monk, params, request } = ctx

  const query = { _id: params.id }

  const update = request.body

  ctx.body = await monk
    .get('traders')
    .findOneAndUpdate(query, update)
}

async function remove (ctx) {
  const { monk, params } = ctx

  const query = { _id: params.id }

  ctx.body = await monk
    .get('traders')
    .findOneAndDelete(query)
}

module.exports = () => {
  const router = new Router()

  router.get('/', list)
  router.post('/', create)
  router.get('/:id', read)
  router.put('/:id', update)
  router.delete('/:id', remove)

  return router.routes()
}
