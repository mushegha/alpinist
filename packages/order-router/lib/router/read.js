const {
  renameKeys
} = require('ramda-adjunct')

/**
 * Helpers
 */

async function read (ctx) {
  const { store, params } = ctx

  const recover = renameKeys({
    _id: 'id',
    _rev: 'rev'
  })

  const resolve = doc => {
    ctx.body = doc
    ctx.status = 200
  }

  return Promise
    .resolve(params.id)
    .then(id => store.get(id))
    .then(recover)
    .then(resolve)
}

module.exports = read

