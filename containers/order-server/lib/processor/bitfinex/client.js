const debug = require('debug')('alpinist:order:bitfinex')

const { WSv2 } = require('bitfinex-api-node')

const { merge } = require('ramda')

/**
 * Client Actions
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
 * Client constructor
 */

function Client (creds = {}) {
  debug('Initializing a client')

  const options = merge(creds, { transform: true })

  return {
    create () {
      const ws = new WSv2(options)

      return open(ws)
        .then(authenticate)
    },
    destroy,
    validate
  }
}

module.exports = Client
