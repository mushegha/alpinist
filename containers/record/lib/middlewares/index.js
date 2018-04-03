const compose = require('koa-compose')

const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')

const monk = require('./monk')
const bull = require('./bull')
const queryparser = require('./queryparser')

module.exports = () =>
  compose([
    logger(),
    bodyparser(),
    monk(),
    bull(),
    queryparser()
  ])
