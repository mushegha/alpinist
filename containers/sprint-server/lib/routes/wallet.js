const { aggregate } = require('../models/bitfinex-wallet')

module.exports = function () {
  return async ctx => {
    try {
      ctx.body = await aggregate({ type: 'exchange' })
    } catch (err) {
      console.error(err)
      ctx.status = 403
    }
  }
}
