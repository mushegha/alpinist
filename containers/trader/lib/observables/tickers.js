const debug = require('debug')('alp:trader:observable')

const { Observable } = require('rxjs')

const { evolve } = require('ramda')

const Symbols = require('./symbols')

/**
 * Getter
 */

const getter = client => symbol => {
  const key = `ticker:${symbol}`

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
  debug('Subscribed to Tickers$')

  return Symbols({ redis })
    .flatMap(getter(redis))
}

/**
 * Expose factory
 */

module.exports = Tickers


