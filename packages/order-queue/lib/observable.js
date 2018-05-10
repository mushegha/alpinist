const { Observable } = require('rxjs/Rx')

const {
  assoc,
  identity,
  prop
} = require('ramda')

const { getOrderFrom } = require('./fn')

/**
 * Constants
 */

const EVENTS = [
  'active',
  'completed',
  'failed'
]

/**
 * Observables
 */

function fromQueue (queue) {
  const getOrder = getOrderFrom(queue)

  const fromQueueEvent = status => {
    const populate = subject => {
      const time = Date.now()

      const p = getOrder(subject)
        .then(assoc('status', status))
        .then(assoc('time', time))

      return Observable.fromPromise(p)
    }

    return Observable
      .fromEvent(queue, `global:${status}`, identity)
      .flatMap(populate)
  }

  return Observable
    .from(EVENTS)
    .flatMap(fromQueueEvent)
}

/**
 * Expose
 */

module.exports.fromQueue = fromQueue
