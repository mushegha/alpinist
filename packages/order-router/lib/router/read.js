async function read (ctx) {
  const { store, params } = ctx

  const resolve = doc => {
    ctx.body = doc
    ctx.status = 200
  }

  return Promise
    .resolve(params.id)
    .then(id => store.getOrder(id))
    .then(resolve)
}

module.exports = read

