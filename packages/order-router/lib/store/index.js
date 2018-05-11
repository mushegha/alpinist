const Store = require('@alpinist/order-store')

/**
 * Settings
 */

const index = {
  fields: [
    'status',
    'timestamp'
  ]
}

function createMiddleware () {
  const store = new Store()

  const ready = Promise.all([
    store.createIndex(index)
  ])

  return async (ctx, next) => {
    await ready

    ctx.store = store

    return next()
  }
}

module.exports = createMiddleware
