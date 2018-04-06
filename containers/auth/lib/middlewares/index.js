const compose = require('koa-compose')

const logger     = require('koa-logger')
const bodyparser = require('koa-bodyparser')

module.exports = () =>
  compose([
    logger(),
    bodyparser()
  ])
