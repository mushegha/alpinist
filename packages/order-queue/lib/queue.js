const debug = require('debug')('alpinist:orders-queue')

const getenv = require('getenv')

const Bull = require('bull')

const { ulid } = require('ulid')

const {
  assoc,
  compose,
  map,
  merge
} = require('ramda')

const {
  allP
} = require('ramda-adjunct')

const MockProcessor = require('./processors/mock')

/**
 * Settings
 */

const REDIS_CONFIG = getenv.multi({
  host : ['REDIS_HOST', 'localhost'],
  port : ['REDIS_PORT', 6379, 'int'],
})

const DEFAULT_CONFIG = {
  redis: REDIS_CONFIG
}

function createQueue (opts) {
  const options = merge(DEFAULT_CONFIG, opts)
  const queue = new Bull('orders', options)

  debug('Add mock processor')
  queue.process('mock', MockProcessor())

  return queue
}

const orderFromJob = job => {
  const convert = compose(
    merge(job.data),
    assoc('subject', job.id),
    assoc('time', job.timestamp)
  )

  return convert({})
}

/**
 * Class OrderQueue
 */

class OrderQueue {
  constructor (opts) {
    this.queue = createQueue(opts)
  }

  /**
   * Add a new order
   *
   * @param {Object} order
   * @param {string} order.broker
   * @param {string} order.side
   * @param {string} order.symbol
   * @param {string} order.price
   * @param {string} order.quantity
   *
   * @returns {Promise}
   */

  add (order) {
    const { broker } = order

    const jobId = ulid()

    return this.queue
      .add(broker, order, { jobId })
      .then(orderFromJob)
  }

  get (id) {
    return this.queue
      .getJob(id)
      .then(orderFromJob)
  }

  getAll () {
    return this.queue
      .getJobs()
      .then(map(orderFromJob))
  }
}

function Queue () {
  return new OrderQueue()
}

module.exports = Queue
