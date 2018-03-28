const Buyer = require('./buy')
const Seller = require('./sell')

function Worker (clients) {
  const { monk } = clients

  const performBuy = Buyer(clients)
  const performSell = Seller(clients)

  return async function evaluate (job) {
    const { trader, ticker } = job.data

    await performBuy(trader, ticker.ask)
    await performSell(trader, ticker.bid)

    return new Promise(res => setTimeout(res, 250))
  }
}


module.exports = Worker
