const {
  buy,
  getBalance
} = require('../lib')

const config = {
  apiKey: process.env.BITFINEX_KEY,
  apiSecret: process.env.BITFINEX_SECRET
}

const params = {
  price: 8746.3,
  amount: 0.0001,
  symbol: 'tBTCUSD'
}

buy(config, params)
