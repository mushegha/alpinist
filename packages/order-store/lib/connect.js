const { Observable } = require('rxjs/Rx')

const {
  prop,
  compose
} = require('ramda')

const { renameKeys } = require('ramda-adjunct')

function source () {
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

  const watch = observer => {
    const emitter = this.changes(options)

    Observable
      .fromEvent(emitter, 'change', selector)
      .subscribe(observer)

    return () => emitter.cancel()
  }

  return Observable.create(watch)
}

function sink () {
  return {
    next: doc => this.putOrder(doc)
  }
}

module.exports = {
  source,
  sink
}
