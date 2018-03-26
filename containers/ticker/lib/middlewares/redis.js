const createClient = require('../clients/redis')

/**
 * Middleware factory
 *
 * @param {Object} opts
 *
 * @returns {Function}
 */

module.exports = opts => {
  const client = createClient(opts)

  return async function redis (ctx, next) {
    ctx.redis = client

    return next()
  }
}
