const debug = require('debug')('alpinist:orders-queue')

const getenv = require('getenv')

const Bull = require('bull')

const MockProcessor = require('./processors/mock')

/**
 * Settings
 */

function Queue (opts) {
  const queue = new Bull('orders', 'redis://localhost:6379')

  // setup processords
  debug('Add mock processor')
  queue.process('mock', MockProcessor())

  return queue
}

module.exports = Queue
