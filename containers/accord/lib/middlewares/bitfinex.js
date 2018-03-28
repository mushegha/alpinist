const { Bitfinex } = require('../clients')

/**
 * Middleware factory
 *
 * @param {Object} opts
 *
 * @returns {Function}
 */

module.exports = () => {
  const client = new Bitfinex()

  return async function bitfinex (ctx, next) {
    ctx.bitfinex = client

    return next()
  }
}
