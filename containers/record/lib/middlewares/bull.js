const { Bull } = require('../clients')


module.exports = (opts = {}) => {
  const { name = 'accounting' } = opts

  const client = new Bull(name)

  return async function bull (ctx, next) {
    ctx.bull = client

    return next()
  }
}

