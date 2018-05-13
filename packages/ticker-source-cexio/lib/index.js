const Axios = require('axios')

const { Observable } = require('rxjs/Rx')

const { recover } = require('./helpers')

const { path } = require('ramda')

const request = Axios.create({
  baseURL: 'https://cex.io/api/tickers'
})

function SourceCexio (symbols) {
  const poll = () =>
    request('/USD')
      .then(path(['data', 'data']))

  return Observable
    .timer(0, 1500)
    .flatMap(poll)
    .flatMap(Observable.from)
    .map(recover)
}

module.exports = SourceCexio
