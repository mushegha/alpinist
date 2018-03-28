const debug = require('debug')('alp:trader:client:redis')

const Redis  = require('ioredis')

const getenv = require('getenv')

const { merge } = require('ramda')

/**
 * Default config
 */

const DEFAULTS = getenv.multi({
  host : ['REDIS_HOST', 'localhost'],
  port : ['REDIS_PORT', 6379, 'int']
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

  debug('Creating...')

  return new Redis(options)
}

/**
 * Expose factory
 */

module.exports = create
