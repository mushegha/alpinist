const Router = require('koa-router')

const {
  create,
  read,
  findAll
} = require('./actions')

module.exports = () => {
  const router = new Router()

  router
    .post('/', create)
    .get('/', findAll)
    .get('/:id', read)

  return router.routes()
}
