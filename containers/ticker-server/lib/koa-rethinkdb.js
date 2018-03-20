const rt = require('rethinkdb')


const options = {
  host: process.env.RETHINKDB_HOST || 'localhost',
  port: process.env.RETHINKDB_PORT || 28015
}


module.exports = function () {
  const connect = rt.connect(options)

  return async (ctx, next) => {
    ctx.conn = await connect
    return next()
  }
}
