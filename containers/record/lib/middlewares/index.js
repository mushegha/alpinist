const compose = require('koa-compose')

const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')

const monk = require('./monk')
const bitfinex = require('./bitfinex')

module.exports = () =>
  compose([
    logger(),
    bodyparser(),
    monk(),
    bitfinex(),
  ])
