const Axios = require('axios')

const { Observable } = require('rxjs/Rx')

const {
  toPlainSymbol,
  recover
} = require('./helpers')

const {
  prop,
  toPairs
} = require('ramda')

const request = Axios.create({
  baseURL: 'https://yobit.net/api/3/ticker'
})

const symbols = [
  'ltc_usd',
  'btc_usd',
  'eth_usd'
]

function SourceYobit () {
  const path = symbols.join('-')

  const poll = () => {
    const promise = request('/' + path)
      .then(prop('data'))
      .then(toPairs)
      .then(results => {
        return results.map(pair => {
          const [ a, b ] = pair

          const symbol = toPlainSymbol(a)

          return {
            symbol,
            broker: 'yobit',
            bid_price: b.buy,
            ask_price: b.sell,
            time: Date.now()
          }
        })
      })

    return Observable
      .fromPromise(promise)
      .flatMap(Observable.from)
  }

  return Observable
    .interval(1500)
    .flatMap(poll)
}

module.exports = SourceYobit
