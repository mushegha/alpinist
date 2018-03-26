const debug = require('debug')('alpinist:ticker:redis')

const Redis  = require('ioredis')

const getenv = require('getenv')

const { merge } = require('ramda')

/**
 * Default config
 */

const DEFAULTS = getenv.multi({
  host      : ['REDIS_HOST', 'localhost'],
  port      : ['REDIS_PORT', 6379, 'int'],
  keyPrefix : ['REDIS_PREFIX', '']
})

/**
 * Client factory
 *
 * @param {Object} opts - Redis client options
 *
 * @returns {Redis}
 */

function create (opts = {}) {
  const options = merge(DEFAULTS, opts)

  debug('Creating client with options: %j', options)

  return new Redis(options)
}

/**
 * Expose factory
 */

module.exports = create
