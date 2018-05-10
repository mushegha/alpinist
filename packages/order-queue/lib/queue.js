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

function Queue (opts) {
  const options = merge(DEFAULT_CONFIG, opts)
  const queue = new Bull('orders', options)

  // setup processords
  debug('Add mock processor')
  queue.process('mock', MockProcessor())

  return queue
}

module.exports = Queue
