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

function getAllOrders (selector = {}) {
  const recoverAllDocs = compose(
    map(recover),
    prop('docs')
  )

  return this
    .find({ selector })
    .then(recoverAllDocs)
}

function getAllOrdersByAgent (agent) {
  const selector = {
    agent: agent.id || agent
  }

  return getAllOrders.call(this, selector)
}

function getBuyOrdersByAgent (agent) {
  const selector = {
    agent: agent.id || agent,
    side: 'buy'
  }

  return getAllOrders.call(this, selector)
}

function getOrderRevs (order) {
  const id = order.id || order

  const parseRev = compose(
    rev => ({ id, rev }),
    (id, i) => `${++i}-${id}`
  )

  const getRevIds = compose(
    reverse,
    path(['_revisions', 'ids'])
  )

  const parseIds = compose(
    ids => ids.map(parseRev),
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
  putOrder,
  getOrder,
  getOrderRevs,
  getAllOrders,
  getAllOrdersByAgent,
  getBuyOrdersByAgent
}
