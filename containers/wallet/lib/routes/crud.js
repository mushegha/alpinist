const Router = require('koa-router')

const {
  merge,
  compose,
  assoc
} = require('ramda')

function read () {
  const callback = (err, list) => {
    return err
      ? Promise.reject(err)
      : Promise.resolve(list)
  }

  return async ctx => {
    const { bitfinex, params } = ctx

    const rest = bitfinex.rest(2)

    ctx.body = await rest
      .wallets(callback)
  }
}

module.exports = () => {
  const router = new Router()

  router.get('/:type', read())

  return router.routes()
}
