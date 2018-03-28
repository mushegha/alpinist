const debug = require('debug')('alp:trader:observable:targets')

const { Observable } = require('rxjs')

const Tickers = require('./tickers')
const Traders = require('./traders')

/**
 * Operators
 */

function Targets (clients) {
  const { redis, monk } = clients

  const propogateTraders = ticker => {
    const query = { symbol: ticker.symbol }

    const toPair = trader => ({ ticker, trader })

    return Traders({ monk }, query)
      .map(toPair)
  }

  return Tickers({ redis })
    .flatMap(propogateTraders)
}


module.exports = Targets
