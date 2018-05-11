const { Observable } = require('rxjs/Rx')

const {
  prop,
  merge
} = require('ramda')

const options = {
  live: true,
  since: 'now',
  include_docs: true
}

const selector = prop('doc')

function fromStore (store) {
  const changes = store.changes(options)

  return Observable
    .fromEvent(changes, 'change', selector)
}

module.exports.fromStore = fromStore
