const Queue = require('bull')

const { createPool } = require('generic-pool')

const getenv = require('getenv')

const REDIS_URL = getenv('REDIS_URL', 'redis://localhost:6379')

function create () {
  return new Queue('orders', REDIS_URL)
}

function destroy (client) {
  return client.close()
}

module.exports = createPool({ create, destroy })
