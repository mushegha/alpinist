const { ulid } = require('ulid')

const {
  when,
  propSatisfies,
  isNil,
  map,
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

const isNew = propSatisfies(isNil, 'id')

/**
 * Methods
 */

function putAgent (agent) {
  const id = agent.id || agent.id || ulid()

  const init = assoc('id', id)

  const diffFunc = compose(
    when(isNew, init),
    mergeFlipped(agent)
  )

  return this
    .upsert(id, diffFunc)
}

function getAgent (agent) {
  const id = agent.id || agent

  return this
    .get(id)
    .then(recover)
}

function getAllAgents (selector = {}) {
  return this
    .find({ selector })
    .then(prop('docs'))
    .then(map(recover))
}

module.exports = {
  getAgent,
  putAgent,
  getAllAgents
}
