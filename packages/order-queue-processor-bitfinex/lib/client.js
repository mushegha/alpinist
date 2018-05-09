const debug = require('debug')('alpinist:order-queue:bitfinex')

const Bitfinex = require('bitfinex-api-node')

const getenv = require('getenv')

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
  debug('Connecting to Bitfinex servers')

  if (ws.isOpen()) {
    debug('Client is already connected')
    return Promise.resolve(ws)
  }

  const open = (resolve, reject) => {
    ws.on('error', err => {
      debug('Could not open WebSocket connection, reason: %s', err.message)
      reject(err)
    })

    ws.on('open', () => {
      debug('Connected')
      resolve(ws)
    })

    ws.open()
  }

  return new Promise(open)
}

/**
 * Auth
 */

function authenticate (ws) {
  debug('Authenticate client')

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
  debug('Creating a client')

  const bfx = new Bitfinex(CONFIG)

  const ws = bfx.ws(2)

  return open(ws).then(authenticate)
}

/**
 * Destroy
 */

function destroy (ws) {
  debug('Closing WebSocket connection')

  return ws.close(1012, 'Destroyed by pool')
}

/**
 * Validate
 */

function validate (ws) {
  debug('Validating client state')

  const isOpen = ws.isOpen()
  const isAuthenticated = ws.isAuthenticated()

  return isOpen && isAuthenticated
}

/**
 * Expose client factory
 */

module.exports = {
  create,
  destroy,
  validate
}
