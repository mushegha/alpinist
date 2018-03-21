const BFX = require('bitfinex-api-node')

const options = {
  apiKey: process.env.BITFINEX_KEY || void 0,
  apiSecret: process.env.BITFINEX_SECRET || void 0
}

const bfx = new BFX(options)

module.exports.rest = bfx.rest(2, { transform: true })
