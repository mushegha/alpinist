const debug = require('debug')('alp:trader:observable')

const { Observable } = require('rxjs')

const {
  evolve,
  assoc
} = require('ramda')

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

  const stamp = data => {
    const t = Date.now()
    return assoc('mts', t, data)
  }

  return client
    .hgetall(key)
    .then(format)
    .then(stamp)
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


