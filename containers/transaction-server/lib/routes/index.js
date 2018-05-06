const Router = require('koa-router')

const create = require('./create')

const router = new Router()

router
  .post('/', create())

module.exports = () =>
  router.routes()

module.exports.create = create
