const Buyer = require('./buy')

function Worker (clients) {
  const { monk } = clients

  const performBuy = Buyer(clients)

  return async function evaluate (job) {
    const { trader, ticker } = job.data

    await performBuy(trader, ticker.ask)

    return new Promise(res => setTimeout(res, 1000))
  }
}


module.exports = Worker
