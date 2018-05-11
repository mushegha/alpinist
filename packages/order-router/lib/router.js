const Router = require('koa-router')

const Actions = require('./actions')

function createRouter () {
  const router = new Router()

  router
    .post('/', Actions.create)
    .get('/', Actions.findAll)
    .get('/:id', Actions.read)

  return router.routes()
}

module.exports = createRouter
