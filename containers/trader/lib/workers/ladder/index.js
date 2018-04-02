const debug = require('debug')('alp:trader:worker')

const performBuy = require('./buy')
const performSell = require('./sell')

function Worker () {

  return async function evaluate (job) {
    const { trader, ticker } = job.data

    try {
      await performBuy(trader, ticker)
      await performSell(trader, ticker)
    } catch (err) {
      debug('Failed with err %s', err.message)
    }
  }
}


module.exports = Worker
