const BFX = require('bitfinex-api-node')

const { Observable } = require('rxjs/Rx')

const {
  fromPlainSymbol,
  toPlainSymbol,
  recover
} = require('./helpers')

function SourceBitfinex (symbols) {
  const bfx = new BFX()

  const subscribe = observer => {
    const ws = bfx.ws(2, { transform: true })

    const next = ticker => {
      observer.next(recover(ticker))
    }

    ws.on('open', () => {
      symbols
        .map(fromPlainSymbol)
        .forEach(symbol => {
          ws.subscribeTicker(symbol)
          ws.onTicker({ symbol }, next)
        })
    })

    ws.open()

    return _ => ws.close()
  }

  return Observable.create(subscribe)
}

module.exports = SourceBitfinex
