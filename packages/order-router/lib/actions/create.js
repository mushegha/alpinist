const {
  compose,
  assoc
} = require('ramda')

const {
  renameKeys
} = require('ramda-adjunct')

const {
  ulid
} = require('ulid')

/**
 * Helpers
 */

async function create (ctx) {
  const { store, request } = ctx

  const convert = compose(
    assoc('_id', ulid()),
    assoc('timestamp', Date.now()),
    assoc('status', 'new'),
  )

  const recover = renameKeys({
    _id: 'id',
    _rev: 'rev'
  })

  const resolve = doc => {
    ctx.body = doc
    ctx.status = 201
  }

  return Promise
    .resolve(request.body)
    .then(convert)
    .then(doc => store.put(doc))
    .then(res => store.get(res.id))
    .then(recover)
    .then(resolve)
}

module.exports = create
