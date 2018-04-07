const debug = require('debug')('alp:broker')

const BFX = require('bitfinex-api-node')

const getenv = require('getenv')

const { merge } = require('ramda')

/**
 * Settings
 */

const DEFAULTS = getenv.multi({
  apiKey    : ['BITFINEX_KEY'],
  apiSecret : ['BITFINEX_SECRET']
})

/**
 * Expose client factory
 */

module.exports = function (opts = {}) {
  debug('Creating Bitfinex client')

  const options = merge(DEFAULTS, opts)

  return new BFX(options)
}
