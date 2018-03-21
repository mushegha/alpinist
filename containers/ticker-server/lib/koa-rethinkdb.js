const { connect } = require('./clients/rethinkdb')

module.exports = function () {
  const connection = connect()

  return async (ctx, next) => {
    ctx.conn = await connection
    return next()
  }
}
