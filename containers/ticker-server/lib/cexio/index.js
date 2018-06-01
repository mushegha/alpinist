const { Observable } = require('rxjs/Rx')

const { fetchAll } = require('./actions')

/**
 * Settings
 */

const DEFAULT_DELAY = 1500

const DEFAULT_CURRENCIES = [
  'USD',
  'EUR',
  'GBP',
  'RUB'
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
    delay = 1500,
    currencies = DEFAULT_CURRENCIES
  } = opts

  const exec = () =>
    fetchAll(currencies)

  const poll = () =>
    Observable
      .fromPromise(exec())
      .flatMap(Observable.from)

  return Observable
    .interval(1500)
    .flatMap(poll)
}

/**
 * Expose
 */

module.exports = Monitor
