const { getAll } = require('../models/wallet')

module.exports = function () {
  return async ctx => {
    try {
      ctx.body = await getAll()
    } catch (err) {
      console.error(err)
      ctx.status = 403
    }
  }
}
