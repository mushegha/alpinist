const {
  curry,
  assoc,
  merge
} = require('ramda')

function getFromStore (store, subject) {
  return store.get(subject)
}

function putIntoStore (store, state) {
  const { subject } = state

  const resolve = _ =>
    getFromStore(store, subject)

  const diffFunc = doc =>
    merge(doc, state)

  return store
    .upsert(subject, diffFunc)
    .then(resolve)
}

/**
 * Expose curried
 */

module.exports.getFromStore = curry(getFromStore)
module.exports.putIntoStore = curry(putIntoStore)
