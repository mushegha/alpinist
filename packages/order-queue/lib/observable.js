const { Observable } = require('rxjs/Rx')

const {
  assoc,
  prop
} = require('ramda')

const EVENTS = [
  'active',
  'completed',
  'failed'
]

function fromQueue ({ queue }) {
  const selector = event => subject =>
    queue
      .getJob(subject)
      .then(prop('data'))
      .then(assoc('status', event))
      .then(assoc('time', Date.now()))

  const fromQueueEvent = event =>
    Observable
      .fromEvent(queue, `global:${event}`, selector(event))
      .flatMap(Observable.fromPromise)

  return Observable
    .from(EVENTS)
    .flatMap(fromQueueEvent)
}

module.exports.fromQueue = fromQueue
