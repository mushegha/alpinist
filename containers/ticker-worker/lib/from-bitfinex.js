const { Observable } = require('rxjs')

const Axios = require('axios')

const { prop } = require('ramda')


const baseURL = 'https://api.bitfinex.com/v2/ticker/'


const API = Axios.create({ baseURL })


const get = pair => {
  const symbol = 't' + pair.toUpperCase()

  const format = args => {
    const bid = args[0]
    const ask = args[2]

    return { bid, ask, pair }
  }

  return API
    .get(symbol)
    .then(prop('data'))
    .then(format)
}


module.exports = pair =>
  Observable
    .interval(60000 / 10)
    .flatMap(_ => get(pair))
