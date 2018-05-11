const { Observable } = require('rxjs/Rx')

const {
  prop,
  compose
} = require('ramda')

const {
  renameKeys
} = require('ramda-adjunct')

const options = {
  live: true,
  since: 'now',
  include_docs: true
}

const selector = compose(
  renameKeys({
    _id  : 'id',
    _rev : 'rev'
  }),
  prop('doc')
)

function fromStore (store) {
  const changes = store.changes(options)

  return Observable
    .fromEvent(changes, 'change', selector)
}

module.exports.fromStore = fromStore
