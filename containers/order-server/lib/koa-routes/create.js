const { addOrderTo } = require('@alpinist/order-queue/lib/fn')

function create () {
  return async (ctx, next) => {
    const { queue, request } = ctx

    ctx.body = await addOrderTo(queue, request.body)

    return next()
  }
}

module.exports = create
