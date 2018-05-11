const { Observable } = require('rxjs/Rx')

const { prop } = require('ramda')

const { renameKeys } = require('ramda-adjunct')

const Store = require('./store')

/**
 * Defaults
 */

function StoreObservable () {
  const options = {
    live: true,
    since: 'now',
    include_docs: true
  }

  const selector = prop('doc')

  const recover = renameKeys({
    _id  : 'id',
    _rev : 'rev'
  })

  function watch (observer) {
    const store = new Store()

    const emitter = store.changes(options)

    Observable
      .fromEvent(emitter, 'change', selector)
      .map(recover)
      .subscribe(observer)

    return () => {
      emitter.cancel()
      return store.close()
    }
  }

  return Observable.create(watch)
}

module.exports = StoreObservable
