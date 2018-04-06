const debug = require('debug')('alp:auth')

const Router = require('koa-router')

const getenv = require('getenv')

const { sign } = require('jsonwebtoken')

const { reduce } = require('ramda')

/**
 * Settings
 */

const SECRET = getenv('JWT_SECRET', 'neckret')

const PASSPHRASE = getenv('AUTH_PASSPHRASE', 'nassphrase')

/**
 * Actions
 */

function auth () {

  return async ctx => {
    const { body } = ctx.request

    debug('Checking passphrase')

    if (body.passphrase === PASSPHRASE) {
      const token = sign({ sub: 'admin' }, SECRET)
      ctx.body = { token }
    } else {
      ctx.status = 401
      ctx.body = { message: 'Wrong passphrase' }
    }
  }
}

module.exports = () => {
  const router = new Router()

  router.post('/', auth())

  return router.routes()
}
