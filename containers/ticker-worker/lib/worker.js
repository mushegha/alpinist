const { Observable } = require('rxjs')

const { assoc } = require('ramda')

const fromBitfinex = require('./from-bitfinex')

const observe = ({ provider, pair }) => {
  const tag = assoc('provider', provider)

  let from

  switch (provider) {
    case 'bitfinex':
      from = fromBitfinex
      break;
  }

  return from(pair)
    .map(tag)
}

module.exports = async job => {
  observe(job.data)
    .subscribe(console.log)
}
