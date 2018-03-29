const debug = require('debug')('alp:trader:worker')

const performBuy = require('./buy')
const performSell = require('./sell')

function Worker () {

  return async function evaluate (job) {
    const { trader, ticker } = job.data

    try {
      await performBuy(trader, ticker.ask)
      await performSell(trader, ticker.bid)
    } catch (err) {
      debug('Failed with err %s', err.message)
    }
  }
}


module.exports = Worker
