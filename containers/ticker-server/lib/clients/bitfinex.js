const BFX = require('bitfinex-api-node')

const getenv = require('getenv')

const options = getenv.multi({
  apiKey    : ['BITFINEX_KEY', ''],
  apiSecret : ['BITFINEX_SECRET', '']
})

const bfx = new BFX(options)

module.exports.rest = bfx.rest(2, { transform: true })
