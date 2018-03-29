const compose = require('koa-compose')

const open  = require('./open')
const list  = require('./list')
const close = require('./close')

module.exports = () =>
  compose([
    list(),
    open(),
    close()
  ])
