const debug = require('debug')('alp:broker:bitfinex')

const { createPool } = require('generic-pool')

const getenv = require('getenv')

const { merge } = require('ramda')

const client = require('./client')

/**
 * Settings
 */

const CONFIG = {
  min: 1,
  max: 5,
  evictionRunIntervalMillis: 1000,
  softIdleTimeoutMillis: 5000
}

/**
 * Expose pool instance
 */

module.exports = createPool(client, CONFIG)
