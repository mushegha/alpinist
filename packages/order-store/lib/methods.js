const { ulid } = require('ulid')

const {
  reverse,
  map,
  mapObjIndexed,
  head,
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

/**
 * Methods
 */

function putOrder (order) {
  const diffFunc = compose(
    timestamp,
    mergeFlipped(order)
  )

  return this
    .upsert(order.id, diffFunc)
}

function addOrder (order) {
  const init = compose(
    assoc('id', ulid()),
    assoc('gid', ulid()),
    assoc('status', 'new')
  )

  return this
    .putOrder(init(order))
}

function getOrder (order) {
  const id = order.id || order

  return this
    .get(id)
    .then(recover)
}

function getOrderRevs (order) {
  const id = order.id || order

  const fromRev = rev =>
    assoc('rev', rev, { id })

  const parseIds = compose(
    map(fromRev),
    revs => revs.map((id, i) => `${i+1}-${id}`),
    reverse,
    path(['_revisions', 'ids']), // parse ids
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
  addOrder,
  getOrder,
  getOrderRevs,
  putOrder,
}
