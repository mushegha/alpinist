const BFX = require('bitfinex-api-node')

const { multi } = require('getenv')

const options = multi({
  apiKey    : ['BITFINEX_KEY', ''],
  apiSecret : ['BITFINEX_SECRET', '']
})

module.exports = new BFX(options)
