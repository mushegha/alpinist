const { Observable } = require('rxjs/Rx')

const SYMBOLS = [
  'ethusd',
  'btcusd'
]

function fromX (price) {
  price++

  const compile = symbol => {
    const broker = 'mock'

    return {
      symbol,
      broker: 'mock',
      bid_price: price - Math.random(),
      ask_price: price + Math.random(),
      timestamp: Date.now()
    }
  }

  return Observable
    .from(SYMBOLS)
    .map(compile)
}

function MockProducer () {
  return Observable
    .interval(1000)
    .flatMap(fromX)
}

module.exports = MockProducer
