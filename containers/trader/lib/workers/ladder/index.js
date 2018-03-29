const performBuy = require('./buy')
const performSell = require('./sell')

function Worker () {

  return async function evaluate (job) {
    const { trader, ticker } = job.data

    try {
      await performBuy(trader, ticker.ask)
      await performSell(trader, ticker.bid)
    } catch (err) {
      console.log(err)
    }

    return new Promise(res => setTimeout(res, 250))
  }
}


module.exports = Worker
