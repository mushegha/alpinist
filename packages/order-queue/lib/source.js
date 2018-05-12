const { Observable } = require('rxjs/Rx')

const {
  assoc,
  identity,
  prop
} = require('ramda')

const Queue = require('./queue')

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

function QueueSource () {
  const queue = new Queue()

  const fromQueueEvent = status => {
    const getOrder = id =>
      queue
        .getJob(id)
        .then(prop('data'))
        .then(assoc('status', status))

    return Observable
      .fromEvent(queue, `global:${status}`, identity)
      .map(getOrder)
      .flatMap(Observable.fromPromise)
  }

  return Observable
    .from(EVENTS)
    .flatMap(fromQueueEvent)
}

/**
 * Expose
 */

module.exports = QueueSource
