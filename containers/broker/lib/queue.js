const debug = require('debug')('alp:broker')

const getenv = require('getenv')

const kue = require('kue')

const workers = require('./workers')

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

const name = 'order'

debug('Creating job queue "%s" ...', name)

const queue = kue.createQueue(DEFAULT_CONFIG)

for (let key in workers) {
  debug('Add worker for %s', key)
  queue.process(key, workers[key])
}

module.exports = queue

module.exports.app = kue.app
