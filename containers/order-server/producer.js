const Channel = require('./lib/channel')

const { Observable } = require('rxjs/Rx')

const mock = _ => {
  const ts = Date.now()
  const id = String(ts)

  return {
    id,
    ts,
    subject: 'sub-' + ts,
    broker: 'bitfinex',
    symbol: 'eth-usd',
    status: 'new',
    side: 'buy',
    price: 620,
    quantity: 0.05
  }
}

const sink = Channel.Observer()

Observable
  .timer(0, 1000)
  .take(1)
  .map(mock)
  .subscribe(sink)

