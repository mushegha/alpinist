const { Observable } = require('rxjs/Rx')

const connect = require('./client')

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
    .fromEvent(client, 'message', (_, x) => x)
    .map(JSON.parse)
}

/**
 * Expose
 */

module.exports = TickersObservable
