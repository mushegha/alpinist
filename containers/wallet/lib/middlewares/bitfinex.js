const { Bitfinex } = require('../clients')

/**
 * Middleware factory
 *
 * @param {Object} opts
 *
 * @returns {Function}
 */

module.exports = opts => {
  const client = new Bitfinex(opts)

  return async function bitfinex (ctx, next) {
    ctx.bitfinex = client

    return next()
  }
}
