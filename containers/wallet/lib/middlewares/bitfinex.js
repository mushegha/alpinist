const { Bitfinex } = require('../clients')

/**
 * Middleware factory
 *
 * @param {Object} opts
 *
 * @returns {Function}
 */

module.exports = opts => {
  return async function bitfinex (ctx, next) {
    ctx.bitfinex = new Bitfinex(opts)

    return next()
  }
}
