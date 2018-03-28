const compose = require('koa-compose')

const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')

const monk = require('./monk')

module.exports = () =>
  compose([
    logger(),
    bodyparser(),
    monk()
  ])
