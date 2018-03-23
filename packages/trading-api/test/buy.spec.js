const {
  buy,
  getBalance
} = require('../lib')

const config = {
  apiKey: process.env.BITFINEX_KEY,
  apiSecret: process.env.BITFINEX_SECRET
}

const params = {
  price: 545.10,
  amount: -0.02,
  symbol: 'tETHUSD'
}

getBalance(config)

buy(config, params)
  .then(
    (x) => {
      console.log(x.price)
      console.log(x.status)
      // console.log(x.serialize())
    }
  )
  .catch(err => {
    console.log(err)
  })
