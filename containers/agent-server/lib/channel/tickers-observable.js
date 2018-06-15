const { Observable } = require('rxjs/Rx')

const connect = require('./client')

/**
 * Helpers
 */

const selector = (_, buf) => {
  const str = buf.toString()

  return JSON.parse(str)
}

/**
 * Ticker MQTT channel observable factory
 *
 * @param {Object} [opts]
 * @param {string} [opts.namespace = '+']
 *
 * @returns {Observable}
 */

function TickersObservable (opts = {}) {
  const { namespace = '+' } = opts

  const client = connect()

  client.on('connect', _ => {
    client.subscribe('tickers/+')
  })

  return Observable
    .fromEvent(client, 'message', selector)
}

/**
 * Expose
 */

module.exports = TickersObservable
