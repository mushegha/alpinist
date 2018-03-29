const debug = require('debug')('alp:record:middleware')

const { Bitfinex } = require('../clients')

/**
 * Middleware factory
 *
 * @param {Object} opts
 *
 * @returns {Function}
 */

module.exports = () => {
  const client = new Bitfinex()

  const ws = client.ws(2)

  const connect = resolve => {
    ws.once('open', () => {
      debug('Bitfinex socket open')

      ws.once('auth', () => {
        debug('Bitfinex authenticated')
        resolve(ws)
      })

      debug('Auth Bitfinex socket')

      ws.auth()
    })

    debug('Opening Bitfinex socket')

    ws.open()
  }

  const pWS = new Promise(connect)

  return async function bitfinex (ctx, next) {
    const ws = await pWS

    ctx.bitfinex = { ws }

    return next()
  }
}
