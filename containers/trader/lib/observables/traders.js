const debug = require('debug')('alp:trader:observable')

const { Observable } = require('rxjs')

/**
 * Factory
 */

function Traders ({ monk }, query) {
  // placeholder for `cursor.close`
  let close = () => {}

  const emit = observer => (trader, cursor) => {
    close = cursor.close

    debug('Emit trader %s', trader._id)
    observer.next(trader)
  }

  const emitter = observer => {
    debug('Fetching traders for query %O', query)

    monk
      .get('traders')
      .find(query)
      .each(emit(observer))

    return () => {
      debug('Closing Traders cursor')
      close()
    }
  }

  return Observable.create(emitter)
}

/**
 * Expose factory
 */

module.exports = Traders
