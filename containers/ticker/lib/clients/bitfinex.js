const debug = require('debug')('alp:ticker:bitfinex')

const BFX = require('bitfinex-api-node')

const getenv = require('getenv')

const { merge } = require('ramda')

const DEFAULTS = getenv.multi({
  apiKey    : ['BITFINEX_KEY', ''],
  apiSecret : ['BITFINEX_SECRET', '']
})


function create (opts = {}) {
  const options = merge(DEFAULTS, opts)

  debug('Creating client')

  return new BFX(options)
}


module.exports = create
