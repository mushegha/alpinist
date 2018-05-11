const {
  curry,
  merge,
  flip
} = require('ramda')

const mergeFlipped = flip(merge)

function getFromStore (store, _id) {
  return store.get(_id)
}

function putIntoStore (store, state) {
  const { _id } = state

  const resolve = _ =>
    getFromStore(store, _id)

  return store
    .upsert(_id, mergeFlipped(state))
    .then(resolve)
}

/**
 * Expose curried
 */

module.exports.getFromStore = curry(getFromStore)
module.exports.putIntoStore = curry(putIntoStore)
