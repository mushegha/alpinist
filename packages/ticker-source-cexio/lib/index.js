const Axios = require('axios')

const { Observable } = require('rxjs/Rx')

const { recover } = require('./helpers')

const { path, map } = require('ramda')

const request = Axios.create({
  baseURL: 'https://cex.io/api/tickers'
})

function SourceCexio (symbols) {
  const poll = () => {
    const promise = request('/USD')
      .then(path(['data', 'data']))
      .then(map(recover))

    return Observable
      .fromPromise(promise)
      .flatMap(Observable.from)
  }

  return Observable
    .interval(1500)
    .flatMap(poll)
}

module.exports = SourceCexio
