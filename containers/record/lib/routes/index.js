const compose = require('koa-compose')

const open = require('./open')
const list = require('./list')

module.exports = () =>
  compose([
    open(),
    list()
  ])
