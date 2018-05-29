const { ulid } = require('ulid')

const {
  curry,
  when,
  propSatisfies,
  isNil,
  reverse,
  map,
  path,
  prop,
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

const recover = renameKeys({
  _id  : 'id',
  _rev : 'rev'
})

const timestamp = obj =>
  assoc('time', Date.now(), obj)

const isNew = propSatisfies(isNil, 'id')

/**
 * Methods
 */

function putOrder (order) {
  const id = order.id || ulid()

  const init = compose(
    assoc('id', id),
    assoc('status', 'new')
  )

  const diffFunc = compose(
    when(isNew, init),
    timestamp,
    mergeFlipped(order)
  )

  return this
    .upsert(id, diffFunc)
}

function getOrder (order) {
  const id = order.id || order

  return this
    .get(id)
    .then(recover)
}

function getOrderRevs (order) {
  const id = order.id || order

  const snapshotOf = rev => ({ id, rev })

  const parseRevs = revs =>
    revs
      .map((id, i) => `${++i}-${id}`)
      .map(snapshotOf)

  const getRevIds = compose(
    reverse,
    path(['_revisions', 'ids'])
  )

  const parseIds = compose(
    parseRevs,
    getRevIds
  )

  const fetchAll = docs => {
    const retreive = path(['docs', 0, 'ok'])

    return this
      .bulkGet({ docs })
      .then(prop('results'))
      .then(map(retreive))
  }

  const options = {
    revs: true,
    revs_info: true
  }

  return this
    .get(id, options)
    .then(parseIds)
    .then(fetchAll)
    .then(map(recover))
}

module.exports = {
  getOrder,
  getOrderRevs,
  putOrder,
}
