const { ulid } = require('ulid')

const {
  curry,
  merge,
  prop
} = require('ramda')

/**
 * Helpers
 */

function fromInput (params) {
  const subject = ulid()
  const time = Date.now()

  return merge(params, {
    subject,
    time
  })
}

function fromJob (job) {
  return prop('data', job)
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

function addOrder (queue, params) {
  const order = fromInput(params)

  const processor = order.broker
  const jobId     = order.subject

  return queue
    .add(processor, order, { jobId })
    .then(fromJob)
}

function getOrder (queue, subject) {
  return queue
    .getJob(subject)
    .then(fromJob)
}

/**
 * Expose curried
 */

module.exports.addOrderTo = curry(addOrder)
module.exports.getOrderFrom = curry(getOrder)
