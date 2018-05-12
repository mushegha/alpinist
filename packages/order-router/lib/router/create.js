async function create (ctx) {
  const { store, request } = ctx

  const resolve = doc => {
    ctx.body = doc
    ctx.status = 201
  }

  return Promise
    .resolve(request.body)
    .then(doc => store.addOrder(doc))
    .then(res => store.getOrder(res.id))
    .then(resolve)
}

module.exports = create
