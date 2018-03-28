const { Monk } = require('../clients')

/**
 * Middleware factory
 *
 * @param {Object} opts
 *
 * @returns {Function}
 */

module.exports = opts => {
  const client = new Monk(opts)

  return async function redis (ctx, next) {
    ctx.monk = client

    return next()
  }
}
