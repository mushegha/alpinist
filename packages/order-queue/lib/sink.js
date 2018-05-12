const { prop } = require('ramda')

const Queue = require('./queue')

function QueueSink () {
  const queue = new Queue()

  const next = order => {
    const processor = order.broker
    const jobId     = order.id

    return queue
      .add(processor, order, { jobId })
      .then(prop('data'))
  }

  return { next }
}

module.exports = QueueSink
