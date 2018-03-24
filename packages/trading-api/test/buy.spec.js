const {
  buy,
  getBalance
} = require('../lib')

const config = {
  apiKey: process.env.BITFINEX_KEY,
  apiSecret: process.env.BITFINEX_SECRET
}

const params = {
  // price: 545.10,
  amount: 0.02,
  symbol: 'tETHUSD'
}

async function perform () {
  await getBalance(config)

  await buy(config, 'tETHUSD', -0.02)
    .then(
      (x) => {
        console.log(x.price)
        console.log(x.amount)
        // console.log(x.serialize())
      }
    )
    .catch(err => {
      console.log(err.message)
    })

  await getBalance(config)
  //
  // await buy(config, 'tETHUSD', -0.02)
  //   .then(
  //     (x) => {
  //       console.log(x.price)
  //       console.log(x.amount)
  //       // console.log(x.serialize())
  //     }
  //   )
  //   .catch(err => {
  //     console.log(err)
  //   })

  await getBalance(config)
}

perform()
