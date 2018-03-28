const debug = require('debug')('alp:trader:observable:traders')

const { Observable } = require('rxjs')

const Monk = require('../clients/monk')

function WithTraders (ticker) {
  const db = new Monk()

  const { symbol } = ticker

  const emitter = observer => {
    const emit = trader =>
      observer.next({ ticker, trader })

    db.get('traders')
      .find({ symbol })
      .each(emit)

    return () => {}
  }

  return Observable.create(emitter)
}

module.exports = WithTraders
