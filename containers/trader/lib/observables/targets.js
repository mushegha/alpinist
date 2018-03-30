const debug = require('debug')('alp:trader:observable')

const { Observable } = require('rxjs')

const Tickers = require('./tickers')
const Traders = require('./traders')

/**
 * Operators
 */

function Targets (clients) {
  const { redis, monk } = clients

  const propogateTraders = ticker => {
    const query = {
      symbol: ticker.symbol,
      isRunning: true
    }

    const toPair = trader => ({ ticker, trader })

    return Traders({ monk }, query)
      .map(toPair)
  }

  debug('Subscribe to Targets$')

  return Tickers({ redis })
    .flatMap(propogateTraders)
}


module.exports = Targets
