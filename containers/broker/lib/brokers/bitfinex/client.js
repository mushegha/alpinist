const debug = require('debug')('alp:broker:bitfinex')

const Bitfinex = require('bitfinex-api-node')

const getenv = require('getenv')

const { merge } = require('ramda')

/**
 * Settings
 */

const CONFIG = getenv.multi({
  apiKey    : ['BITFINEX_KEY'],
  apiSecret : ['BITFINEX_SECRET']
})

/**
 * Actions
 */

/**
 * Open
 */

function open (ws) {
  debug('Opening WebSocket client connection')

  if (ws.isOpen()) {
    debug('Client already open')
    return Promise.resolve(ws)
  }

  const open = (resolve, reject) => {
    ws.on('error', err => {
      debug('Could not open WebSocket, reason: %s', err.message)
      reject(err)
    })

    ws.on('open', () => {
      debug('Client is open')
      resolve(ws)
    })

    ws.open()
  }

  return new Promise(open)
}

/**
 * Auth
 */

function auth (ws) {
  debug('Authenticate WebSocket client')

  if (ws.isAuthenticated()) {
    debug('Already authenticated')
    return Promise.resolve(ws)
  }

  const auth = (resolve, reject) => {
    ws.on('error', err => {
      debug('Could not authenticate, reason: %s', err.message)
      reject(err)
    })

    ws.once('auth', () => {
      debug('Client is authenticated')
      resolve(ws)
    })

    ws.auth()
  }

  return new Promise(auth)
}

/**
 * Create
 */

function create () {
  debug('Creating WebSocket client')

  const bfx = new Bitfinex(CONFIG)

  const ws = bfx.ws(2)

  return open(ws).then(auth)
}

/**
 * Destroy
 */

function destroy (ws) {
  debug('Closing WebSocket connection')

  return ws.close(0, 'Destroyed by pool')
}

/**
 * Expose client factory
 */

module.exports = {
  create,
  destroy
}
