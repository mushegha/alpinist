const debug = require('debug')('alp:broker')

const Bull = require('bull')

const getenv = require('getenv')

const { merge } = require('ramda')

/**
 * Settings
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
  debug('Creating job queue "%s" ...', name)

  const options = merge(DEFAULT_OPTS, opts)

  return new Bull(name, options)
}

/**
 * Expose factory
 */

module.exports = create
