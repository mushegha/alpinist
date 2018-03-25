const { getOpenSlots } = require('../getters/mongodb-ladder')

module.exports = function () {
  return async ctx => {
    ctx.body = await getOpenSlots()
  }
}
