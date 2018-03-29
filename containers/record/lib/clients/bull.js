const debug = require('debug')('alp:trader:client:bull')

const Bull = require('bull')

const getenv = require('getenv')

const { merge } = require('ramda')

/**
 * Default config
 */

const REDIS_OPTS = getenv.multi({
  host : ['REDIS_HOST', 'localhost'],
  port : ['REDIS_PORT', 6379, 'int'],
})

const DEFAULT_OPTS = {
  redis: REDIS_OPTS
}

/**
 * Client factory
 */

function create (name, opts = {}) {
  const options = merge(DEFAULT_OPTS, opts)

  debug('Creating %s ...', name)

  return new Bull(name, options)
}

/**
 * Expose factory
 */

module.exports = create
