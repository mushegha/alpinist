const { Observable } = require('rxjs/Rx')

const { fetchAll } = require('./actions')

/**
 * Settings
 */

const DEFAULT_DELAY = 1500

const DEFAULT_CURRENCIES = [
  'USD'
]

/**
 * Observable constructor
 *
 * @param {Object} opts
 * @param {number} opts.delay
 * @param {Array}  opts.currencies
 */

function Monitor (opts = {}) {
  const {
    delay = DEFAULT_DELAY,
    currencies = DEFAULT_CURRENCIES
  } = opts

  const exec = () => fetchAll(currencies)

  const poll = () =>
    Observable
      .fromPromise(exec())
      .flatMap(Observable.from)

  return Observable
    .timer(0, delay)
    .flatMap(poll)
}

/**
 * Expose
 */

module.exports = Monitor
