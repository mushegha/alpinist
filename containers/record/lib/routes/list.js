const { get } = require('koa-route')

async function list (ctx) {
  const { monk } = ctx

  const { query, options } = ctx.state

  ctx.body = await monk
    .get('records')
    .find(query, options)
}

module.exports = () =>
  get('/', list)



