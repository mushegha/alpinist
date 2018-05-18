const { Order } = require('bitfinex-api-node/lib/models')

const getenv = require('getenv')

const Connect = require('../lib')

const Pool = require('../lib/pool')

const { fromOrder } = require('../lib/observable')

const options = getenv.multi({
  apiKey    : ['BITFINEX_API_KEY'],
  apiSecret : ['BITFINEX_API_SECRET']
})

const through = Connect(options)

const params = {
  cid: 1234,
  amount: -0.02,
  symbol: 'tETHEUR',
  type: 'EXCHANGE MARKET'
}

through(params)
  .subscribe(console.log, console.error, () => console.log('done'))
