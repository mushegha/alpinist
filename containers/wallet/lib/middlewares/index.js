const compose = require('koa-compose')

const logger = require('koa-logger')

const bitfinex = require('./bitfinex')

module.exports = () =>
  compose([
    logger(),
    bitfinex()
  ])
