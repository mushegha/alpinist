const config = require('../../config')

module.exports = function () {
  return async ctx => {
    ctx.body = config
  }
}
