const debug = require('debug')('alpinist:order:bitfinex')

const { createPool } = require('generic-pool')

const Client = require('./client')

/**
 * Pool Settings
 */

const POOL_CONFIG = {
  min                       : 1,
  max                       : 1,
  evictionRunIntervalMillis : 1e3,
  idleTimeoutMillis         : 300e3,
  testOnBorrow              : true
}

/**
 * Factory methods
 */

async function create () {
  debug('Initializing a client')

  const client = new Client()

  await client.open()
  await client.authenticate()

  return client
}

async function destroy (client) {
  return client.close()
}

async function validate (client) {
  const { hb, isOpen } = client
  const passed = Date.now() - hb

  return isOpen && passed < 60 * 1e3
}

/**
 * Pool constructor
 *
 * @param {Object} creds
 * @param {string} creds.apiKey
 * @param {string} creds.apiSecret
 *
 * @returns {Object} - Pool instance
 */

function Pool () {
  debug('Creating WS client pool')

  const factory = { create, destroy, validate }

  const pool = createPool(factory, POOL_CONFIG)

  pool.on('factoryCreateError', err => {
    debug('Pool failed to create: %s', err.message)
  })

  pool.on('factoryDestroyError', function(err){
    debug('Pool failed to destroy: %s', err.message)
  })

  return pool
}


/**
 * Expose pool constructor
 */

module.exports = Pool
