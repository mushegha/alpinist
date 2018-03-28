const debug = require('debug')('alp:trader:observable:tickers')

const { Observable } = require('rxjs')

const { evolve } = require('ramda')

const Symbols = require('./symbols')

/**
 * Getter
 */

const getter = client => symbol => {
  const key = `ticker:${symbol}`

  console.log(key)

  const format = evolve({
    bid: Number,
    ask: Number
  })

  return client
    .hgetall(key)
    .then(format)
}

/**
 * Factory
 */

function Tickers ({ redis }) {
  debug('Creating...')

  return Symbols({ redis })
    .flatMap(getter(redis))
}

/**
 * Expose factory
 */

module.exports = Tickers


