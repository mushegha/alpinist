const Router = require('koa-router')

const create  = require('./create')
const read    = require('./read')
const findAll = require('./find-all')

module.exports = () => {
  const router = new Router()

  router
    .post('/', create)
    .get('/', findAll)
    .get('/:id', read)

  return router.routes()
}
