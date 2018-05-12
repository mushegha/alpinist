const {
  map,
  prop,
  compose
} = require('ramda')

const {
  renameKeys
} = require('ramda-adjunct')

/**
 * Helpers
 */

async function findAll (ctx) {
  const { store } = ctx
  const { query } = ctx.request

  const recoverOne = renameKeys({
    _id: 'id',
    _rev: 'rev'
  })

  const recover = compose(
    map(recoverOne),
    prop('docs')
  )

  const resolve = doc => {
    ctx.body = doc
    ctx.status = 200
  }

  return Promise
    .resolve(query)
    .then(selector => store.find({ selector }))
    .then(recover)
    .then(members => ({ members, query }))
    .then(resolve)
}

module.exports = findAll

