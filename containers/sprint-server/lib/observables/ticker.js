const { Observable } = require('rxjs')

const bfx = require('../clients/bitfinex')


function Ticker (symbol) {
  const ws = bfx.ws(2)

  function listener (observer) {
    ws.on('open', () => {
      ws.subscribeTicker(symbol)
    })

    ws.onTicker({ symbol }, ticker => {
      const bid = ticker[0]
      const ask = ticker[2]

      observer.next({ bid, ask })
    })

    ws.open()

    return () => ws.close()
  }

  return Observable.create(listener)
}

module.exports = Ticker
