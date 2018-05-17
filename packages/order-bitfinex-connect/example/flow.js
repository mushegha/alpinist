const Pool = require('../lib/pool')

const getenv = require('getenv')

const options = getenv.multi({
  apiKey    : ['BITFINEX_API_KEY'],
  apiSecret : ['BITFINEX_API_SECRET']
})

const pool = new Pool(options)

pool
  .acquire()
  .then(ws => {
    ws.onMessage({}, console.log)
    // ws.onOrderUpdate({}, console.log)

    pool
      .acquire()
      .then(ws => {
        const cid = 1233

        const order = {
          gid: 1000,
          cid,
          amount: 0.03,
          symbol: 'tETHEUR',
          type: 'EXCHANGE MARKET'
        }

        ws.submitOrder(order)
          .then(o => console.log('> ', o))
      })

  })

