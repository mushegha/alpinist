const debug = require('debug')('alpinist:orders-queue')

const getenv = require('getenv')

const Bull = require('bull')

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

/**
 * Manual
 */

module.exports = ({ process = false } = {}) => {
  debug('Creating job queue for orders')

  const queue = new Bull(DEFAULT_CONFIG)

  if (process) {
    debug('Add mock processor')
    queue.process('mock', MockProcessor())
  }

  return queue
}
