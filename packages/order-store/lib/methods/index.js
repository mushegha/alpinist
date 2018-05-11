const { ulid } = require('ulid')

const {
  assoc,
  compose,
  flip,
  merge
} = require('ramda')

const {
  renameKeys
} = require('ramda-adjunct')

/**
 * Utils
 */

const mergeFlipped = flip(merge)

/**
 * Methods
 */

function putOrder (order) {
  const diffFunc = compose(
    assoc('timestamp', Date.now()),
    mergeFlipped(order)
  )

  return this
    .upsert(order.id, diffFunc)
}

function addOrder (order) {
  const init = compose(
    assoc('id', ulid()),
    assoc('status', 'new')
  )

  return this
    .putOrder(init(order))
}

function getOrder (order) {
  const id = order.id || order

  const recover = renameKeys({
    _id  : 'id',
    _rev : 'rev'
  })

  return this
    .get(id)
    .then(recover)
}

module.exports = {
  getOrder,
  addOrder,
  putOrder,
}
