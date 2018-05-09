const debug = require('debug')('alpinist:order-queue:bitfinex')

const { createPool } = require('generic-pool')

const getenv = require('getenv')

const client = require('./client')

/**
 * Settings
 */

const CONFIG = getenv.multi({
  min                       : ['BITFINEX_POOL_MIN', 1, 'int'],
  max                       : ['BITFINEX_POOL_MAX', 5, 'int'],
  evictionRunIntervalMillis : ['BITFINEX_POOL_TTL_DT', 1e3, 'int'],
  idleTimeoutMillis         : ['BITFINEX_POOL_TTL', 300e3, 'int'],
  testOnBorrow              : ['BITFINEX_POOL_TEST', true, 'bool']
})

/**
 * Expose pool instance
 */

module.exports = function Pool () {
  debug('Creating WS client pool')

  const pool = createPool(client, CONFIG)

  pool.on('factoryCreateError', err => {
    debug('Pool failed to create: %s', err.message)
  })

  pool.on('factoryDestroyError', function(err){
    debug('Pool failed to destroy: %s', err.message)
  })

  return pool
}
