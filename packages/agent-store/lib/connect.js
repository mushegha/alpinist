const { Observable } = require('rxjs/Rx')

const {
  prop,
  compose,
  merge,
  identity
} = require('ramda')

const { renameKeys } = require('ramda-adjunct')

/**
 * Settings
 */

const DEFAULT_OPTIONS = {
  live: true,
  since: 'now',
  include_docs: true
}

/**
 * Helpers
 */

const recover = renameKeys({
  _id: 'id',
  _rev: 'rev'
})

const selector = compose(recover, prop('doc'))

/**
 *
 */

function source (opts = {}) {
  const options = merge(DEFAULT_OPTIONS, opts)

  const emitter = this.changes(options)

  const change$ = Observable
    .fromEvent(emitter, 'change', selector)

  const end$ = Observable
    .fromEvent(emitter, 'complete')

  const watch = observer => {
    change$
      .takeUntil(end$)
      .subscribe(observer)

    return () => emitter.cancel()
  }

  return Observable.create(watch)
}

module.exports = {
  source
}
