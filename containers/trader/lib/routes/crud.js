const Router = require('koa-router')

const {
  merge,
  compose,
  assoc
} = require('ramda')


const DEFAULTS = {
  isRunning  : true,
  treshold   : 1,
  investment : 1,
  buyDownB   : 0,
  buyDownK   : 1,
  buyUpK     : 1,
  buyUpB     : 0,
  limitKeep  : 1,
  limitSell  : 1
}

function list () {
  return async ctx => {
    const { monk }  = ctx

    ctx.body = await monk
      .get('traders')
      .find()
  }
}

function create () {
  const assignDate = doc => {
    const now = new Date()
    return assoc('dateCreated', now, doc)
  }

  const prepare = compose(
    assignDate,
    merge(DEFAULTS)
  )

  return async ctx => {
    const { monk, request } = ctx

    const doc = prepare(request.body)

    ctx.assert(doc.symbol, 422)

    ctx.body = await monk
      .get('traders')
      .insert(doc)
  }
}

function read () {
  return async ctx => {
    const { monk, params } = ctx

    const query = { _id: params.id }

    const res = await monk
      .get('traders')
      .findOne(params.id)

    ctx.assert(res, 404)

    ctx.body = res
  }
}

function update () {
  return async ctx => {
    const { monk, params, request } = ctx

    ctx.body = await monk
      .get('traders')
      .findOneAndUpdate(params.id, { $set: request.body })
  }
}

function destroy () {
  return async ctx => {
    const { monk, params } = ctx

    ctx.body = await monk
      .get('traders')
      .findOneAndDelete(params.id)
  }
}

module.exports = () => {
  const router = new Router()

  router.get('/', list())
  router.post('/', create())
  router.get('/:id', read())
  router.put('/:id', update())
  router.delete('/:id', destroy())

  return router.routes()
}
