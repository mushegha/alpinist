const compose = require('koa-compose')

const open = require('./open')
// const close = require('./close')

module.exports = () =>
  compose([
    open()
  ])
