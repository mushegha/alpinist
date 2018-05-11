const { Observable } = require('rxjs/Rx')

const { prop } = require('ramda')

const { renameKeys } = require('ramda-adjunct')

function source () {
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

  const watch = observer => {
    const emitter = this.changes(options)

    Observable
      .fromEvent(emitter, 'change', selector)
      .map(recover)
      .subscribe(observer)

    return () => emitter.cancel()
  }

  return Observable.create(watch)
}

function sink () {
  const next = doc => {
    // console.log(doc)
    return this
      .putOrder(doc)
      .then(console.log)
  }

  return { next }
}

module.exports = {
  source,
  sink
}
