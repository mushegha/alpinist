const {
  prop,
  assoc,
  compose,
  curry,
  merge,
  flip,
  isNil
} = require('ramda')

const {
  defaultWhen
} = require('ramda-adjunct')

const mergeFlipped = flip(merge)


function getFromStore (store, _id) {
  return store.get(_id)
}

function putIntoStore (store, state) {
  const { _id } = state

  const assocTimestamp = assoc('timestamp', Date.now())

  const diffFunc = compose(
    assocTimestamp,
    mergeFlipped(state)
  )

  return store.upsert(_id, diffFunc)
}

function findAllFromStore (store, selector) {
  const resolve = prop('docs')

  return store
    .find({ selector })
    .then(resolve)
}

/**
 * Expose curried
 */

module.exports.getFromStore = curry(getFromStore)
module.exports.putIntoStore = curry(putIntoStore)
module.exports.findAllFromStore = curry(findAllFromStore)
