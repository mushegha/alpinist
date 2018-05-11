const Store = require('./store')

function createMiddleware (opts) {
  const store = new Store(opts)

  return async (ctx, next) => {
    ctx.store = store

    return next()
  }
}

module.exports = createMiddleware
