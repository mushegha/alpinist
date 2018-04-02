const debug = require('alp:wallet')

const Router = require('koa-router')

const {
  merge,
  compose,
  assoc,
  filter,
  whereEq,
  toLower,
  reduce
} = require('ramda')

function read () {
  const scanTo = (acc, { currency, balance }) => {
    const key = toLower(currency)
    return assoc(key, balance, acc)
  }

  const callback = (err, list) => {
    return err
      ? Promise.reject(err)
      : Promise.resolve(list)
  }

  return async ctx => {
    const { bitfinex, params } = ctx

    const rest = bitfinex.rest(2, { transform: true })

    ctx.body = await rest
      .wallets(callback)
      .then(filter(whereEq(params)))
      .then(reduce(scanTo, {}))
      .catch(err => {
        debug('Error while getting from remote')
        debug('Error: %s', err.message)
      })
  }
}

module.exports = () => {
  const router = new Router()

  router.get('/:type', read())

  return router.routes()
}
